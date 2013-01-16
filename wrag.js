var Wrag = {
    init: function(params, $grid) {
        if (!$grid)
            $grid = $('#grid');
        var controllerUrl = '/' + params.controller + '/';
        
        // Setting labels
        if (!params.colNames && params.labels) {
            params.colNames = Wrag.makeColNames(params.colModel, params.labels);
            delete params.labels;
        }
        
        var jqGridConfig = $.extend({
            url: controllerUrl + 'grid',
            datatype: 'json',
            colNames: params.colNames,
            colModel: params.colModel,
            rowNum: 10,
            rowList: [10,20,30],
            pager: '#pager',
            sortname: params.sortname ? params.sortname : params.pk,
            viewrecords: true,
            sortorder: 'desc',
            caption:  params.caption,
            
            afterInsertRow: function(rowId, rowData, rowElem)
            {
                if ( !params.colGenerators )
                    return;
                
                // Adding addition cols
                var cols = {};
                var colName;
                var generator; // Row content generator function
                for (colName in params.colGenerators) {
                    generator = params.colGenerators[colName];
                    if ( generator ) {
                        cols[colName] = generator(params, rowId, rowData);
                    }
                }
                $grid .jqGrid('setRowData', rowId, cols);
            },
            gridComplete: params.gridComplete
        }, params);
        
        $grid .jqGrid( jqGridConfig );
        
        for (var i=0; i<params.colModel.length; ++i) {
            if (params.colModel[i].search) {
                // Enabling search
                $('#grid') .jqGrid('filterToolbar', {
                    stringResult: true,
                    autosearch: true,
                    searchOnEnter: true,
                    defaultSearch: 'cn'
                });
                break;
            }
        }
    },
    
    makeColNames: function(colModel, labels) {
        var colNames = [];
            
        for (var i=0; i<colModel.length; ++i) {
            var name = colModel[i].name;
            colNames.push(labels[name] ? labels[name] : '');
        }

        return colNames;
    },
    
    reload: function () {
        $('#grid') .jqGrid().trigger('reloadGrid');
    },
    
    col: {
        normal: function(params) {
            return $.extend({
                index:  params.name,
                search: false
            }, params);
        },
        number: function(params) {
            return Wrag.col.normal($.extend({
                align: 'right'
            }, params));
        },
        hidden: function(params) {
            return Wrag.col.normal($.extend({
                sortable: false,
                hidden:   true,
                hidedlg:  true
            }, params));
        },
        nonData: function(params) {
            return Wrag.col.normal($.extend({
                sortable: false,
                hidedlg:  true,
                align: 'center'
            }, params));
        }
    },
    
    colGenerators: {
        edit: function(params, rowId, rowData) {
            return '<a href="/' + params.controller + '/edit?' + params.pk + '=' + rowData[params.pk] + '">Edit</a>';;
        },
        'delete': function(params, rowId, rowData) {
            return '<a class="delete" data-id="' + rowData[params.pk] + '">Delete</a>';;
        }
    },
    
    actions: {
        'delete': function(controller, idItem) {
            if ( confirm('Are you sure?') ) {
                $.post(
                    '/' + controller + '/delete',
                    {id: idItem},
                    Wrag.reload
                );
            }
        }
    }
};

$.fn.wrag = function(params) {
    Wrag.init(params, this);
}
