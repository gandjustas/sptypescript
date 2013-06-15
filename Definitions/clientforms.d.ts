function SPFormControl_AppendValidationErrorMessage(nodeId: string, errorResult): void;

declare module SPClientForms {
    declare module ClientValidation {
        export class ValidationResult {
            constructor(hasErrors: bool, errorMsg: string);
        }

        export class ValidatorSet {
            public RegisterValidator(validator: IValidator);
        }

        export interface IValidator {
            Validate(value: any): ValidationResult;
        }

        export class RequiredValidator implements IValidator {
            Validate(value: any): ValidationResult;
        }
    }
}