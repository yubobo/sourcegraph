package docs

import (
	"os"

	"github.com/sourcegraph/sourcegraph/cmd/frontend/graphqlbackend"
	"github.com/sourcegraph/sourcegraph/cmd/frontend/internal/pkg/markdown"
)

// Register the resolver for the GraphQL field Query.helpPage.
func init() {
	graphqlbackend.HelpPageResolver = func(args graphqlbackend.HelpPageArgs) (graphqlbackend.HelpPage, error) {
		data, filePath, err := readFile(args.Path)
		if err != nil {
			if os.IsNotExist(err) {
				err = nil
			}
			return nil, err
		}

		html := markdown.Render(string(data), nil)
		return &helpPage{
			html:     html,
			filePath: filePath,
		}, nil
	}
}

// helpPage implements the GraphQL type HelpPage.
type helpPage struct {
	html     string
	filePath string
}

func (r *helpPage) HTML() string     { return r.html }
func (r *helpPage) FilePath() string { return r.filePath }

var _ graphqlbackend.HelpPage = &helpPage{}
