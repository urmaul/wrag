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
            Grid.col.hidden({name:'idImage'}),
            Grid.col.normal({name:'title', width:490, search: true}),
            Grid.col.hidden({name:'idUser'}),
            Grid.col.normal({name:'submitter', width:80}),
            Grid.col.normal({name:'status', width:60}),
            Grid.col.nonData({name:'hide', width:40}),
            Grid.col.nonData({name:'edit', width:40}),
            Grid.col.nonData({name:'delete', width:40})
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