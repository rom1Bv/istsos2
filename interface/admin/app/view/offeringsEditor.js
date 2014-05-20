/*
 * File: app/view/offeringsEditor.js
 * Date: Fri May 04 2012 11:08:56 GMT+0200 (CEST)
 *
 * This file was generated by Ext Designer version 1.2.2.
 * http://www.sencha.com/products/designer/
 *
 * This file will be generated the first time you export.
 *
 * You should implement event handling and custom methods in this
 * class.
 */

Ext.define('istsos.view.offeringsEditor', {
    extend: 'istsos.view.ui.offeringsEditor',

    initComponent: function() {
        var me = this;
        Ext.create('istsos.store.gridOfferings');
        Ext.create('istsos.store.Procedures',{
            storeId: 'proceduresNonmembers'
        });
        Ext.create('istsos.store.Procedures',{
            storeId: 'proceduresMembers'
        });
        var cmbName = Ext.create('istsos.store.cmbName');
        
        me.callParent(arguments);
        
        cmbName.getProxy().url=Ext.String.format(
            '{0}/istsos/services/{1}/offerings/operations/getlist',
            wa.url, this.istService);
        
        
        Ext.getCmp("btnNew").on("click",function(){
            this.resetForm();
            Ext.getCmp('frmOfferings').show();
        },this);
        
        
        Ext.getCmp("btnForm").on("click",function(){
            var f = Ext.getCmp('frmOfferings');
            var btn = Ext.getCmp("btnForm");
            if (f.getForm().isValid()) {
                var jsonData = f.getValues();
                if (btn.getText()=='Insert') {
                    Ext.Ajax.request({
                        url: Ext.String.format('{0}/istsos/services/{1}/offerings',wa.url, this.istService),
                        scope: this,
                        method: "POST",
                        jsonData: jsonData,
                        success: function(response){
                            this.resetForm();
                            this.operationLoad();
                            Ext.getCmp('frmOfferings').hide();
                        }
                    });
                }else{
                    Ext.Ajax.request({
                        url: Ext.String.format('{0}/istsos/services/{1}/offerings/{2}',
                            wa.url, this.istService,Ext.getCmp('offName').originalValue),
                        scope: this,
                        method: "PUT",
                        jsonData: jsonData,
                        success: function(response){
                            this.resetForm();
                            this.operationLoad();
                            Ext.getCmp('frmOfferings').hide();
                        }
                    });
                }
            }else{
                Ext.MessageBox.show({
                    title: 'Validation error',
                    msg: "Filled data is invalid",
                    buttons: Ext.MessageBox.OK,
                    animateTarget: f
                });
                return;
            }
        },this);
        
        Ext.getCmp("gridoff").on("select",function(rowmodel, record, index, eOpts ){
            Ext.getCmp('frmOfferings').loadRecord(record);
            Ext.getCmp('btnForm').setText('Update');
            Ext.getCmp('btnRemove').enable();
            Ext.getCmp('frmOfferings').show();
        });
        
        
        Ext.getCmp("btnRemove").on("click",function(){
            var sm = Ext.getCmp("gridoff").getSelectionModel();
            var rec = sm.getSelection();
            if (rec.length>0) {
                Ext.Ajax.request({
                    url: Ext.String.format('{0}/istsos/services/{1}/offerings/{2}',
                        wa.url, this.istService,Ext.getCmp('offName').originalValue),
                    scope: this,
                    method: "DELETE",
                    jsonData: {
                        'name': rec[0].get('name'),
                        'description': rec[0].get('description')
                    },
                    success: function(response){
                        this.resetForm();
                        this.operationLoad();
                        Ext.getCmp('frmOfferings').hide();
                    }
                });                
            }
        },this);
        
        Ext.getCmp('cbOfferings').on("select",function( combo, records, eOpts){
            
            var members = Ext.getCmp('gridMembers');
            var nonmembers = Ext.getCmp('gridNonMembers');
            
            if (Ext.isEmpty(members.mask)) {
                members.mask = new Ext.LoadMask(members.body, {
                    msg:"Loading members..."
                });
            }
            
            if (Ext.isEmpty(nonmembers.mask)) {
                nonmembers.mask = new Ext.LoadMask(nonmembers.body, {
                    msg:"Loading not members..."
                });
            }
            
            members.mask.show();
            nonmembers.mask.show();
            
            Ext.Ajax.request({
                url: Ext.String.format(
                    '{0}/istsos/services/{1}/offerings/{2}/procedures/operations/memberslist',
                    wa.url, this.istService,combo.getValue()),
                scope: members,
                method: "GET",
                success: function(response){
                    var json = Ext.decode(response.responseText);
                    this.getStore().loadData(json.data);
                    this.mask.hide();
                }
            });
            Ext.Ajax.request({
                url: Ext.String.format(
                    '{0}/istsos/services/{1}/offerings/{2}/procedures/operations/nonmemberslist',
                    wa.url, this.istService,combo.getValue()),
                scope: nonmembers,
                method: "GET",
                success: function(response){
                    var json = Ext.decode(response.responseText);
                    this.getStore().loadData(json.data);
                    this.mask.hide();
                }
            });
            
        },this);
        
        Ext.getCmp('gridNonMembers').view.on("beforedrop",
            function ( node, data, overModel, dropPosition, dropFunction, eOpts ) {
                console.dir(data.records);
                dropFunction.wait=true;
                Ext.Ajax.request({
                    url: Ext.String.format(
                        '{0}/istsos/services/{1}/offerings/{2}/procedures/{3}',
                        wa.url, this.istService,Ext.getCmp('cbOfferings').getValue(),data.records[0].get("name")),
                    scope: dropFunction,
                    method: "DELETE",
                    success: function(response){
                        var json = Ext.decode(response.responseText);
                        if (json['success']) {
                            this.processDrop();
                        }else{
                            dropFunction.cancelDrop();
                            Ext.Msg.alert("Server message", "\"" + json['message'] + "\"<br/><br/>" + 
                                "<small>Status response: " + response.statusText + "</small>");
                        }
                    }
                });
                return 0; 
            },this);
            
        Ext.getCmp('gridMembers').view.on("beforedrop",
            function ( node, data, overModel, dropPosition, dropFunction, eOpts ) {
                console.dir(data.records);
                dropFunction.wait=true;
                var jsonData = [];
                for (var i = 0; i < data.records.length; i++) {
                    jsonData.push({
                        "offering": Ext.getCmp('cbOfferings').getValue(),
                        "procedure": data.records[i].get("name")
                    });
                }
                Ext.Ajax.request({
                    url: Ext.String.format(
                        '{0}/istsos/services/{1}/offerings/{2}/procedures',
                        wa.url, this.istService,Ext.getCmp('cbOfferings').getValue()),
                    scope: dropFunction,
                    jsonData: jsonData,
                    method: "POST",
                    success: function(response){
                        var json = Ext.decode(response.responseText);
                        if (json['success']) {
                            this.processDrop();
                        }else{
                            dropFunction.cancelDrop();
                            Ext.Msg.alert("Server message", "\"" + json['message'] + "\"<br/><br/>" + 
                                "<small>Status response: " + response.statusText + "</small>");
                        }
                    }
                });
                return 0; 
            },this);
    },
    operationLoad: function(){
        if (Ext.isEmpty(this.mask)) {
            this.mask = new Ext.LoadMask(this.body, {
                msg:"Please wait..."
            });
        }
        this.mask.show();
        Ext.Ajax.request({
            url: Ext.String.format('{0}/istsos/services/{1}/offerings',wa.url, this.istService),
            scope: this,
            method: "GET",
            success: function(response){
                var json = Ext.decode(response.responseText);
                if (json.success) {
                    Ext.getStore("gridofferings").loadData(json.data);
                }
                this.mask.hide();
            }
        });
    },
    resetForm: function(){
        
        Ext.getCmp('frmOfferings').loadRecord({
            'data': {
                "name": null,
                "description": null,
                "procedures": null,
                "expiration": null,
                "active": null
            }
        });
        Ext.getCmp('offName').clearInvalid();
        Ext.getCmp('btnForm').setText('Insert');
        Ext.getCmp('btnRemove').disable();
        Ext.getCmp("gridoff").getSelectionModel().deselectAll();
    }
});