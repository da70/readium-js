describe('Epub.PackageDocument', function() {
    
    describe("module structure", function () {

        it("exists in the namespace", function() {
            
            expect(Epub.PackageDocument).toBeDefined();
        });
    });

    describe("initialization", function() {

        beforeEach(function() {

            var packageDocumentJson = JSON.parse(jasmine.getFixtures().read("package_document.json"));
            this.packageDocument = new Epub.PackageDocument({ packageDocumentObject : packageDocumentJson });
        });

        it("sets the package document object", function () {

            expect(this.packageDocument.get("packageDocumentObject")).toBeDefined();
        });

        it("creates a spine model", function () {

            expect(this.packageDocument.spine).toBeDefined();
        });

        it("adds all the spine items", function () {

            var numSpineItemsInFixture = 3;
            expect(this.packageDocument.spine.length).toBe(numSpineItemsInFixture);
        });

        it("creates a manifest model", function () {

            expect(this.packageDocument.manifest).toBeDefined();
        });

        it("adds all the manifest items", function () {

            var numManifestItemsInFixture = 10;
            expect(this.packageDocument.manifest.length).toBe(numManifestItemsInFixture);
        });

        it("creates a metadata model", function () {

            expect(this.packageDocument.metadata).toBeDefined();
        });
    });

    describe("public interface", function () {

        beforeEach(function() {

            var packageDocumentJson = JSON.parse(jasmine.getFixtures().read("package_document.json"));
            this.packageDocument = new Epub.PackageDocument({ packageDocumentObject : packageDocumentJson });
        });

        describe("getManifestItemById()", function () {

            it("finds a manifest item", function () {

                var manifestItemIdFromFixture = "Page_1";
                var manifestItem = this.packageDocument.getManifestItemById(manifestItemIdFromFixture);

                expect(manifestItem).toBeDefined();
                expect(manifestItem.get("id")).toBe(manifestItemIdFromFixture);
            });

            // id is not found
            it("is undefined when manifest item is not found", function () {

                var nonExistentId = "this id does not exist";
                var manifestItem = this.packageDocument.getManifestItemById(nonExistentId);

                expect(manifestItem).not.toBeDefined();
            });
        });

        describe("getManifestItemByIdref()", function () {

            it("finds a manifest item with idref", function () {

                var manifestItemIdrefFromFixture = "Page_1";
                var manifestItem = this.packageDocument.getManifestItemById(manifestItemIdrefFromFixture);

                expect(manifestItem).toBeDefined();
                expect(manifestItem.get("id")).toBe(manifestItemIdrefFromFixture);
            });            
        });

        describe("getSpineItem()", function () {

            it("is undefined for: spineIndex < 0", function () {

                var spineItem = this.packageDocument.getSpineItem(-1);

                expect(spineItem).not.toBeDefined();
            });

            it("gets the first spine item for: spineIndex = 0", function () {

                var spineItem = this.packageDocument.getSpineItem(0);
                var firstSpineItemIdrefInFixture = "Page_1";

                expect(spineItem.get("idref")).toBe(firstSpineItemIdrefInFixture);
            });

            it("gets the last spine item for: spineIndex = length - 1", function () {

                var spineItem = this.packageDocument.getSpineItem(2);
                var lastSpineItemIdrefInFixture = "Page_3";

                expect(spineItem.get("idref")).toBe(lastSpineItemIdrefInFixture);
            });

            it("is undefined for: spineIndex > length - 1", function () {

                var spineItem = this.packageDocument.getSpineItem(3);

                expect(spineItem).not.toBeDefined();
            });
        });

        describe("spineLength()", function () {

            it("gets the spine length", function () {

                var spineLengthInFixture = 3;
                var spineLength = this.packageDocument.spineLength();

                expect(spineLength).toBe(spineLengthInFixture);
            });
        });

        describe("getNextLinearSpinePosition()", function () {

            beforeEach(function () {

                var packageDocumentObject = JSON.parse(jasmine.getFixtures().read("package_document_for_linear.json"));
                this.packageDocument = new Epub.PackageDocument({ packageDocumentObject : packageDocumentObject });
            });

            it("gets the next linear position", function () {

                var startSpineIndex = 1;
                var expectedSpineIndex = 2;
                var foundSpineIndex = this.packageDocument.getNextLinearSpinePosition(startSpineIndex);

                expect(foundSpineIndex).toBe(expectedSpineIndex);
            });

            it("is undefined if there is no next spine item", function () {

                var startSpineIndex = 7;
                var foundSpineIndex = this.packageDocument.getNextLinearSpinePosition(startSpineIndex);

                expect(foundSpineIndex).not.toBeDefined();
            });

            it("finds the next linear position for: spineIndex < 0", function () {

                var startSpineIndex = -1;
                var expectedSpineIndex = 0;
                var foundSpineIndex = this.packageDocument.getNextLinearSpinePosition(startSpineIndex);

                expect(foundSpineIndex).toBe(expectedSpineIndex);
            });

            it("is undefined for: spineIndex > spineLength - 1", function () {

                var startSpineIndex = 8;
                var foundSpineIndex = this.packageDocument.getNextLinearSpinePosition(startSpineIndex);

                expect(foundSpineIndex).not.toBeDefined();
            });

            it("ignores non-linear positions", function () {

                var startSpineIndex = 2;
                var expectedSpineIndex = 4;
                var foundSpineIndex = this.packageDocument.getNextLinearSpinePosition(startSpineIndex);

                expect(foundSpineIndex).toBe(expectedSpineIndex);
            });
        });

        describe("getPrevLinearSpinePosition()", function () {

            beforeEach(function () {

                var packageDocumentObject = JSON.parse(jasmine.getFixtures().read("package_document_for_linear.json"));
                this.packageDocument = new Epub.PackageDocument({ packageDocumentObject : packageDocumentObject });
            });

            it("gets the previous linear position", function () {

                var startSpineIndex = 2;
                var expectedSpineIndex = 1;
                var foundSpineIndex = this.packageDocument.getPrevLinearSpinePosition(startSpineIndex);

                expect(foundSpineIndex).toBe(expectedSpineIndex);
            });

            it("is undefined if there is no previous spine item", function () {

                var startSpineIndex = 0;
                var foundSpineIndex = this.packageDocument.getPrevLinearSpinePosition(startSpineIndex);

                expect(foundSpineIndex).not.toBeDefined();
            });

            it("is undefined for: spineIndex < 0", function () {

                var startSpineIndex = -1;
                var foundSpineIndex = this.packageDocument.getPrevLinearSpinePosition(startSpineIndex);

                expect(foundSpineIndex).not.toBeDefined();
            });

            it("finds the previous position for: spineIndex > spineLength - 1", function () {

                var startSpineIndex = 8;
                var expectedSpineIndex = 7;
                var foundSpineIndex = this.packageDocument.getPrevLinearSpinePosition(startSpineIndex);

                expect(foundSpineIndex).toBe(expectedSpineIndex);
            });

            it("ignores non-linear positions", function () {

                var startSpineIndex = 4;
                var expectedSpineIndex = 2;
                var foundSpineIndex = this.packageDocument.getPrevLinearSpinePosition(startSpineIndex);

                expect(foundSpineIndex).toBe(expectedSpineIndex);
            });
        });

        describe("pageProgressionDirection()", function () {

        });
    });

    describe("private helpers", function () {

        describe("assignPageSpreadClass()", function () {

            

        });      

    });
});
