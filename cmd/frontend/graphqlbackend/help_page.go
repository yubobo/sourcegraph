package graphqlbackend

// HelpPageResolver is the resolver for the GraphQL field Query.helpPage.
//
// It is set at init time.
var HelpPageResolver func(HelpPageArgs) (HelpPage, error)

type HelpPageArgs struct {
	Path string
}

// HelpPage is the interface for the GraphQL type HelpPage.
type HelpPage interface {
	HTML() string
	FilePath() string
}

func (*schemaResolver) HelpPage(args *HelpPageArgs) (HelpPage, error) {
	return HelpPageResolver(*args)
}
