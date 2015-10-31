module _ {
    _spBodyOnLoadFunctions.push(() => {
        SP.SOD.executeFunc('jsgrid.js', '', () => {
            var jsgrid = new SP.JsGrid.JsGridControl($get('grid'), true);
            jsgrid.Init(getParameters());
        });
    });

    function getParameters(): SP.JsGrid.JsGridControl.Parameters {
        var info: SP.JsGrid.IGridData = {
            MetaData: { KeyColumnName: "name" },
            Fields: [
                { fieldKey:"name", propertyTypeId:"String", hasLocalizedValue:true, hasDataValue:true }
            ],
            Columns: [
                { fieldKey: "name", fieldKeys: ["name"], columnKey: "name", name:"Название", width:150, isVisible:true }
            ],
            ViewInfo: ["Hello"],
            LocalizedTable: [{ name: "Hello" }],
            UnlocalizedTable: [{ name: "Hello" }]
        };

        var ds = new SP.JsGrid.StaticDataSource(info);
        return ds.InitJsGridParams();
    }
}