import { LoadingSpinner } from '@sourcegraph/react-loading-spinner'
import ErrorIcon from 'mdi-react/ErrorIcon'
import MapSearchIcon from 'mdi-react/MapSearchIcon'
import PencilBoxOutlineIcon from 'mdi-react/PencilBoxOutlineIcon'
import React from 'react'
import { Link, RouteComponentProps } from 'react-router-dom'
import { Observable, Subject, Subscription } from 'rxjs'
import { catchError, distinctUntilChanged, map, startWith, switchMap } from 'rxjs/operators'
import { gql, queryGraphQL } from '../backend/graphql'
import * as GQL from '../backend/graphqlschema'
import { HeroPage } from '../components/HeroPage'
import { Markdown } from '../components/Markdown'
import { PageTitle } from '../components/PageTitle'
import { asError, createAggregateError, ErrorLike, isErrorLike } from '../util/errors'
import { memoizeObservable } from '../util/memoize'

const queryDocPage = memoizeObservable(
    (path: string): Observable<GQL.IHelpPage | null> =>
        queryGraphQL(
            gql`
                query HelpPage($path: String!) {
                    helpPage(path: $path) {
                        html
                        filePath
                    }
                }
            `,
            { path }
        ).pipe(
            map(({ data, errors }) => {
                if (!data || (errors && errors.length > 0)) {
                    throw createAggregateError(errors)
                }
                return data.helpPage
            })
        ),
    path => path
)

interface Props extends RouteComponentProps<{}> {
    /** The path of the documentation file to display. */
    path: string
}

const LOADING: 'loading' = 'loading'

interface State {
    /** The help page, null for not found, loading, or an error. */
    helpPageOrError: GQL.IHelpPage | null | typeof LOADING | ErrorLike
}

/**
 * A Markdown-rendered Sourcegraph documentation help page.
 */
export class HelpPage extends React.PureComponent<Props, State> {
    public state: State = { helpPageOrError: LOADING }

    private componentUpdates = new Subject<Props>()
    private subscriptions = new Subscription()

    public componentDidMount(): void {
        const pathChanges = this.componentUpdates.pipe(
            map(({ path }) => path),
            distinctUntilChanged()
        )

        this.subscriptions.add(
            pathChanges
                .pipe(
                    switchMap(path =>
                        queryDocPage(path).pipe(
                            catchError(err => [asError(err)]),
                            startWith(LOADING)
                        )
                    ),
                    map(result => ({ helpPageOrError: result }))
                )
                .subscribe(stateUpdate => this.setState(stateUpdate))
        )

        this.componentUpdates.next(this.props)
    }

    public componentDidUpdate(): void {
        this.componentUpdates.next(this.props)
    }

    public componentWillUnmount(): void {
        this.subscriptions.unsubscribe()
    }

    public render(): JSX.Element {
        const pathParts = this.props.path ? this.props.path.split('/') : []
        // const breadcrumb: string[] = pathParts.map((_path, i) => pathParts.slice(0, i + 1).join('/'))

        return (
            <>
                <PageTitle title="Help" />
                {this.state.helpPageOrError === null ? (
                    <HeroPage
                        icon={MapSearchIcon}
                        title="404: Not Found"
                        subtitle="The requested help page was not found."
                    />
                ) : isErrorLike(this.state.helpPageOrError) ? (
                    <HeroPage icon={ErrorIcon} title="Error" subtitle={this.state.helpPageOrError.message} />
                ) : (
                    <div className="help-page container mt-3 mx-2">
                        <div className="d-flex align-items-center justify-content-between mb-3">
                            <div className="breadcrumb">
                                <Link
                                    to={this.props.match.path}
                                    className={`breadcrumb-item ${pathParts.length === 0 ? 'active' : ''}`}
                                >
                                    Help
                                </Link>
                                {pathParts.map((path, i) => (
                                    <Link
                                        key={i}
                                        to={`${this.props.match.path}/${pathParts.slice(0, i + 1).join('/')}`}
                                        className={`breadcrumb-item ${i === pathParts.length - 1 ? 'active' : ''}`}
                                    >
                                        {path}
                                    </Link>
                                ))}
                            </div>
                            <a
                                href={
                                    this.state.helpPageOrError === LOADING
                                        ? undefined
                                        : `https://github.com/sourcegraph/sourcegraph/edit/master/doc/${
                                              this.state.helpPageOrError.filePath
                                          }`
                                }
                                className={`flex-shrink-0 btn btn-outline-link btn-sm ${
                                    this.state.helpPageOrError === LOADING ? 'disabled' : ''
                                }`}
                            >
                                <PencilBoxOutlineIcon className="icon-inline" /> Edit this page
                            </a>
                        </div>
                        {this.state.helpPageOrError === LOADING ? (
                            <LoadingSpinner className="icon-inline" />
                        ) : (
                            <div onClick={this.onContentClick}>
                                <base href={`${this.props.match.path}/${this.state.helpPageOrError.filePath}`} />
                                <Markdown dangerousInnerHTML={this.state.helpPageOrError.html} />
                            </div>
                        )}
                    </div>
                )}
            </>
        )
    }

    private onContentClick: React.MouseEventHandler<HTMLElement> = event => {
        // Capture clicks on relative links and use pushState for them instead of incurring a full
        // page reload.
        if (
            !event.defaultPrevented &&
            event.button === 0 &&
            !event.metaKey &&
            !event.altKey &&
            !event.ctrlKey &&
            !event.shiftKey
        ) {
            // Find nearest ancestor <a>.
            let e: HTMLElement | null = event.target as HTMLElement
            while (e) {
                const href = e.getAttribute('href')
                if (isAnchor(e) && !e.target && href && !/^(https?:)?\/\//.test(href)) {
                    event.preventDefault()
                    const url = new URL(e.href)
                    this.props.history.push({ pathname: url.pathname, hash: url.hash })
                    return
                }
                e = e.parentElement
            }
        }
    }
}

function isAnchor(e: HTMLElement): e is HTMLAnchorElement {
    return e.tagName === 'A'
}
