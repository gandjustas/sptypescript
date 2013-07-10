///<reference path="../Definitions/SharePoint.d.ts" />

module spdevlab {
    export module demo {
        export module autofill {
            export class AutoCountries {
                static _countries = ["Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Anguilla", "Antigua & Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas"
                    , "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia & Herzegovina", "Botswana", "Brazil", "British Virgin Islands"
                    , "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Chad", "Chile", "China", "Colombia", "Congo", "Cook Islands", "Costa Rica"
                    , "Cote D Ivoire", "Croatia", "Cruise Ship", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea"
                    , "Estonia", "Ethiopia", "Falkland Islands", "Faroe Islands", "Fiji", "Finland", "France", "French Polynesia", "French West Indies", "Gabon", "Gambia", "Georgia", "Germany", "Ghana"
                    , "Gibraltar", "Greece", "Greenland", "Grenada", "Guam", "Guatemala", "Guernsey", "Guinea", "Guinea Bissau", "Guyana", "Haiti", "Honduras", "Hong Kong", "Hungary", "Iceland", "India"
                    , "Indonesia", "Iran", "Iraq", "Ireland", "Isle of Man", "Israel", "Italy", "Jamaica", "Japan", "Jersey", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyz Republic", "Laos", "Latvia"
                    , "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Mauritania"
                    , "Mauritius", "Mexico", "Moldova", "Monaco", "Mongolia", "Montenegro", "Montserrat", "Morocco", "Mozambique", "Namibia", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia"
                    , "New Zealand", "Nicaragua", "Niger", "Nigeria", "Norway", "Oman", "Pakistan", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal"
                    , "Puerto Rico", "Qatar", "Reunion", "Romania", "Russia", "Rwanda", "Saint Pierre & Miquelon", "Samoa", "San Marino", "Satellite", "Saudi Arabia", "Senegal", "Serbia", "Seychelles"
                    , "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "St Kitts & Nevis", "St Lucia", "St Vincent", "St. Lucia", "Sudan"
                    , "Suriname", "Swaziland", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor L'Este", "Togo", "Tonga", "Trinidad & Tobago", "Tunisia"
                    , "Turkey", "Turkmenistan", "Turks & Caicos", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "Uruguay", "Uzbekistan", "Venezuela", "Vietnam", "Virgin Islands (US)"
                    , "Yemen", "Zambia", "Zimbabwe"];

                _targetInput: HTMLElement;
                _autofillControl: SPClientAutoFill;

                constructor(targetInputId: string, targetAutoCompleteId: string) {
                    this._targetInput = document.getElementById(targetInputId);
                    this._autofillControl = new SPClientAutoFill(targetInputId, targetAutoCompleteId, target => this._onPopulate(target));

                    this._autofillControl.AutoFillMinTextLength = 2;
                    this._autofillControl.VisibleItemCount = 15;
                }

                _onPopulate(targetElement: HTMLInputElement) {

                    var value = targetElement.value.toLowerCase();
                    var countries = AutoCountries._countries;

                    var items = [];
                    var totalItems = 0;

                    for (var i = 0; i < countries.length; i++) {

                        var lCountryName = countries[i].toLowerCase();

                        if (lCountryName.indexOf(value) == 0) {
                            items.push(this._buildOptionItem(countries[i], i));
                            totalItems++;
                        }
                    }

                    items.push(this._buildSeparatorItem());

                    if (totalItems == 0)
                        items.push(this._buildFooterItem("No results. Please refine your query."));
                    else
                        items.push(this._buildFooterItem("Found " + totalItems + " items!"));

                    this._autofillControl.PopulateAutoFill(items, this._onSelectItem);
                }

                _onSelectItem(targetInputId, item: ISPClientAutoFillData) {

                    var targetElement = <HTMLInputElement>document.getElementById(targetInputId);
                    targetElement.value = item[SPClientAutoFill.DisplayTextProperty];
                }

                _buildOptionItem(name: string, id: number) {

                    var item = {};

                    item[SPClientAutoFill.KeyProperty] = id;
                    item[SPClientAutoFill.DisplayTextProperty] = name;
                    item[SPClientAutoFill.TitleTextProperty] = name;
                    item[SPClientAutoFill.MenuOptionTypeProperty] = SPClientAutoFill.MenuOptionType.Option;

                    return item;
                }
                
                _buildSeparatorItem() {

                    var item = {};

                    item[SPClientAutoFill.MenuOptionTypeProperty] = SPClientAutoFill.MenuOptionType.Separator;

                    return item;
                }
                
                _buildFooterItem(title: string) {

                    var item = {};

                    item[SPClientAutoFill.DisplayTextProperty] = title;
                    item[SPClientAutoFill.MenuOptionTypeProperty] = SPClientAutoFill.MenuOptionType.Footer;

                    return item;
                }

            }
        }
    }

    SP.SOD.executeFunc("autofill.js", null, () => {
        var control = new spdevlab.demo.autofill.AutoCountries("clientName", "clientAutoCompleteValues");
    });
}

