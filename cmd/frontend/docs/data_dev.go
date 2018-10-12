// +build !dist

package docs

import (
	"net/http"
)

func init() {
	Data = http.Dir("../sourcegraph/doc")
}
