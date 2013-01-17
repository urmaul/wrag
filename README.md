Pre-alpha version. DO NOT use it
========================
Wrag
====

jqGrid wrapper with sugar.

Features
--------

* Genarating colName array from {name: label} object
* Semantic column config generating functions
* Columns with JS-generated content
* Automatically opening filter toolbar

## Events

* onCellClick(rowid, column, cellcontent, e) - same as onCellSelect, but second attribute is column name (not column index).

Examples
--------

Calling example.

```js
jQuery(function($) {
    Wrag.init({
        controller: 'image',
        pk: 'idImage',
        labels: {
            title: 'Title',
            submitter: 'Submitter',
            status: 'Status'
        },
        colModel:[
            Wrag.col.hidden({name:'idImage'}),
            Wrag.col.normal({name:'title', width:490, search: true}),
            Wrag.col.hidden({name:'idUser'}),
            Wrag.col.normal({name:'submitter', width:80}),
            Wrag.col.normal({name:'status', width:60}),
            Wrag.col.nonData({name:'hide', width:40}),
            Wrag.col.nonData({name:'edit', width:40}),
            Wrag.col.nonData({name:'delete', width:40})
        ],
        caption: "Images",
        
        colGenerators: {
            'submitter': function(params, rowId, rowData) {
                return '<a href="/profile/'+rowData.idUser+'" target="_blank">'+rowData.submitter+'</a>';
            },
            'hide': function(params, rowId, rowData) {
                return '<a class="hide-image" data-id="'+rowData.idImage+'">Hide</a>';
            },
            'edit': function(params, rowId, rowData) {
                return '<a href="/image/' + rowData.idImage + '/edit" target="_blank">Edit</a>';
            },
            'delete': Wrag.colGenerators['delete']
        },
        
        gridComplete: AfterGrid.init
    });
});
```

TODO
----

* Allow user to create several instances of Wrag grids
* Refactor init method
* Refactor url generation
* Allow to edit default params
