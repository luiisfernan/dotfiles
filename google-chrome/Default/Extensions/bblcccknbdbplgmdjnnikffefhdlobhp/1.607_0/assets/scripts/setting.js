var AppSetting={defaultPAC:null,pacConfig:{mode:"pac_script",pacScript:{data:this.defaultPAC}},proxy:null,currentPxy:null,init:function(){if(chrome.experimental!==undefined&&chrome.experimental.proxy!==undefined){this.proxy=chrome.experimental.proxy}else{if(chrome.proxy!==undefined){this.proxy=chrome.proxy}else{alert("Need proxy api support, please update your Chrome");return}}this.setProxy()},setProxy:function(pac){if(!pac||pac==null||$.trim(pac)==""){pac=this.defaultPAC}if(pac==null){this.proxy.settings.clear({scope:"regular"},function(){})}else{this.pacConfig.pacScript.data=pac;this.proxy.settings.set({value:this.pacConfig},function(){})}},getSetting:function(){return this.pacConfig.pacScript.data},getSelectModel:function(){var selectModel=window.localStorage.getItem("selectModel");if(selectModel==null||!selectModel){selectModel="select";storage.setItem("selectModel",selectModel)}return selectModel},setCurrentPxy:function(pxy,flag){this.currentPxy=pxy;if(pxy){storage.setItem("selectId",pxy.id)}else{storage.removeItem("selectId")}this.resetting();if(!flag){var data={};if(this.currentPxy!=null){data.pxyId=this.currentPxy.id+""}data.model=this.getSelectModel();updateUserPxy(data)}},changeSelectModel:function(m){if(m=="auto"){storage.setItem("selectModel",m);this.setCurrentPxy(AppPxy.getAutoProxy())}else{storage.setItem("selectModel",m);var pxy=AppPxy.getSelectProxy(storage.getItem("selectId"));this.setCurrentPxy(pxy)}},getConnectModel:function(){var model=storage.getItem("model");if(model){return model}else{storage.setItem("model",defaultModel);return defaultModel}},changeConnectModel:function(model){var oldModel=this.getConnectModel();if(oldModel!=model){storage.setItem("model",model);this.resetting()}},resetting:function(){var pac=Domains.generatePAC(this.getConnectModel(),this.currentPxy);this.setProxy(pac)},clear:function(){storage.removeItem("model");storage.removeItem("selectModel");storage.removeItem("selectId");this.setProxy()},setSelelctPxy:function(){this.changeSelectModel(this.getSelectModel())}};