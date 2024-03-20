import { AddressDataFormSchema } from "./user-data-schema";

  
  describe("AddressDataFormSchema", () => {

    describe("when validating a complete valid schema", () => {

      it("should return true", async () => {
        expect(await AddressDataFormSchema.isValid(validAddress)).toBeTruthy();
      });
    });

    describe("when validating the schema with an optional field empty", () => {
        
        it("should return true", async () => {
          expect(await AddressDataFormSchema.isValid(validAddress)).toBeTruthy();
        });
      });

      describe("when validating the schema with one required field empty", () => {
        
        it("should return false", async () => {
          expect(await AddressDataFormSchema.isValid(invalidAddress)).toBeFalsy();
        });
      });
  });
  