TESTS = test/*.js
REPORTER = dot

NODEPATH = `pwd`/cloud:`pwd`/shared
test:
	env NODE_PATH=$(NODEPATH)  ./node_modules/.bin/mocha \
    --ui tdd \
		--reporter $(REPORTER) \
    --globals fh-nodeapp \
    --globals fh \
    --globals fhserver \
		--timeout 20000 \
		$(TESTS)

test-cov: lib-cov
	@CONNECT_COV=1 $(MAKE) test REPORTER=html-cov > coverage.html

lib-cov:
	@jscoverage lib $@

.PHONY: test-cov test
