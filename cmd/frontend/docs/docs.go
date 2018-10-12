package docs

import (
	"io/ioutil"
	"net/http"
	"os"
	pathpkg "path"
)

//go:generate go run data_generate.go

// Data contains the Sourcegraph documentation files.
var Data http.FileSystem

func readFile(path string) (data []byte, filePath string, err error) {
	if path == "" {
		// Special-case: the top-level index file is README.md not index.md.
		path = "README"
	}

	filePath = path + ".md"
	f, err := Data.Open("/" + filePath)
	if err != nil {
		if os.IsNotExist(err) {
			// Try looking up the path as a directory and reading its index file (index.md).
			return readFile(pathpkg.Join(path, "index"))
		}
		return nil, "", err
	}
	data, err = ioutil.ReadAll(f)
	return data, filePath, err
}
