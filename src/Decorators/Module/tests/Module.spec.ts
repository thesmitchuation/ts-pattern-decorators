import { Module } from "../Module";
import { Provider } from "../../Provider";
import "reflect-metadata";
import { INJECTABLE_NAME } from "../../../Constants";
import { getInjectableName } from "../../../Helpers/Metadata";

describe("Module", () => {
    it("should be defined", () => {
        expect(Module).toBeDefined();
    });
    
    it('should define an injectable name', () => {
        @Module()
        class TestModule {}

        const metadata = Reflect.getMetadata(INJECTABLE_NAME, TestModule);
        expect(metadata).toEqual("TestModule");
    });

    it("should define metadata", () => {
        @Module({
            providers: [],
        })
        class TestModule {}

        const metadata = Reflect.getMetadata("providers", TestModule);
        expect(metadata).toEqual({});
    });

    it("should define metadata with providers", () => {
        @Provider()
        class TestService {}

        @Module({
            providers: [TestService],
        })
        class TestModule {}

        const metadata = Reflect.getMetadata("providers", TestModule);
        expect(metadata[getInjectableName(TestService)].prototype).toEqual(TestService);
    });
});
