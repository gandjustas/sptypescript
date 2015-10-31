declare module spdevlab {
    module demo {
        module autofill {
            class AutoCountries {
                static _countries: string[];
                _targetInput: HTMLElement;
                _autofillControl: SPClientAutoFill;
                constructor(targetInputId: string, targetAutoCompleteId: string);
                _onPopulate(targetElement: HTMLInputElement): void;
                _onSelectItem(targetInputId: any, item: ISPClientAutoFillData): void;
                _buildOptionItem(name: string, id: number): {};
                _buildSeparatorItem(): {};
                _buildFooterItem(title: string): {};
            }
        }
    }
}
