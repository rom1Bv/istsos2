/*
 * File: app/view/ui/proceduresList.js
 * Date: Fri Dec 13 2013 10:53:43 GMT+0100 (CET)
 *
 * This file was generated by Ext Designer version 1.2.3.
 * http://www.sencha.com/products/designer/
 *
 * This file will be auto-generated each and everytime you export.
 *
 * Do NOT hand edit this file.
 */

Ext.define('istsos.view.ui.proceduresList', {
    extend: 'Ext.grid.Panel',

    height: 400,
    autoScroll: true,
    forceFit: true,
    store: 'procedurelist',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    items: [
                        {
                            xtype: 'button',
                            id: 'btnRemove',
                            text: 'Delete selected'
                        }
                    ]
                }
            ],
            viewConfig: {

            },
            columns: [
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'name',
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'description',
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'sensortype',
                    text: 'Sensor Type'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'offerings',
                    text: 'Offerings'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'observedproperties',
                    text: 'Observedproperties'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'samplingTime',
                    text: 'BeginPosition'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'samplingTime',
                    text: 'EndPosition'
                }
            ]
        });

        me.callParent(arguments);
    }
});