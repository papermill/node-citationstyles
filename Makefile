UPSTREAM_HASH = $(shell git log --pretty=%h citationstyles-org)
NEW_VERSION = $(shell node -e 'var v = require("fs-extra").readJsonSync("package.json").version.split("."); v[2] = (parseInt(v[2])+1).toString(); process.stdout.write(v.join("."));')

default: fulltest

test:
	vows

fulltest:
	pwd
	/usr/local/share/npm/bin/vows --spec

bump: test update_upstream
	@echo "${NEW_VERSION}-${UPSTREAM_HASH}"
	
update_upstream:
	git fetch citationstyles-org/
	git submodule update citationstyles-org/
	git status
	