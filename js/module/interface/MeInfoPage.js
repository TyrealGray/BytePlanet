define(function(require) {
    'use strict';

    var Mustache = require('mustache'),

        InheritHelper = require('lib/InheritHelper'),
        
        CentreContentPage = require('module/interface/CentreContentPage'),

        GlobalVar = require('module/GlobalVar');


    function MeInfoPage() {
        this.superClass();
    }
    
    InheritHelper.inheritPrototype(MeInfoPage, CentreContentPage);

    MeInfoPage.prototype.INDEX = 2;
    
    
    
    return MeInfoPage;
});