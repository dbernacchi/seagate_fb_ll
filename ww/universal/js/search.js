// Define namespace and functions
//only executed when page has #searchPageBox
if($("#searchPageBox")[0]){
    /**
     * stx is the global namespace for all Seagate JavaScript functions
     */
    var stx = {
        global:{}
    };
    
    /**
     * Global utility functions
     * @constructor
     * @memberof stx
     */
    stx.global.utils = {
        /**
         * Returns value of URL parameter passed
         */
        getUrlParam: function(param) {
            
        }
    }
    
    /**
     * Global variables
     * @constructor
     */
    stx.global.vars = {
        "exampleKey" : "value"
    }
    
    /**
     * All search related functions
     * @constructor
     */
    stx.search = {
        
        keyword:$("#searchPageBox").val(),
        mainTabAjax:"/ww/universal/display-views/search-results-ajax.jsp",
        kbfilterAjax:"/ww/universal/display-views/search-filter-kb.jsp",
        relatedAjax:"/ww/universal/display-views/search-related-results-ajax.jsp",
        start:0,
        num:10,
        relatednum:3,
        site:stxProperties.allCollectionSite,
        client:stxProperties.client,
        kbclient:"kb_frontend",
        kbSite:"KB",
        ie:"utf8",
        oe:"utf8",
        tlen:"100",
        getfields:"*",
        lr:stxProperties.lr,
        filter:"0",
        sort:"date:D:L:d1",
        requiredfields:"",
        currentnavtab:"nav-tabs-all",
        kbfilter:"",
        output:"xml_no_dtd",
        initLoad:"true",
        suggestionkeyword:"",
        searchUrlPrefix:stxProperties.searchURLPrefix,
        allCollectionSite:stxProperties.allCollectionSite,
        supportSite:stxProperties.supportSite,
        domoreSite:stxProperties.domoreSite,
        productFinderSite:stxProperties.productFinderSite,
        waitingText:stxProperties.waitingText,
        rclocale:stxProperties.rclocale,
        searchResultsAllTitle:stxProperties.searchResultsAllTitle,
        searchResultsPsTitle:stxProperties.searchResultsPsTitle,
        searchResultsKbTitle:stxProperties.searchResultsKbTitle,
        searchResultsSpTitle:stxProperties.searchResultsSpTitle,
        searchResultsDomoreTitle:stxProperties.searchResultsDomoreTitle,
        switchSpellingSuggestion:"0",   
        initLoading:"true",
        pageTitle:$(document).attr("title"),
        /**
         * Initialize listeners for search box
         */
        init: function() {
    
       
            
            /*
             bind keyup event for enter key to submit the search form
             * */
            
            $("#searchPageBox").keyup(function(event){
               
               if(event.keyCode==13){
                    stx.search.initLoad="true";
                    stx.search.keyword=$("#searchPageBox").val();
                    stx.search.start="0";
                    stx.search.requiredfields="";
                    stx.search.kbfilter="";
                    stx.search.suggestionkeyword="";
                    History.pushState({keyword:stx.search.keyword, 
                        start:stx.search.start,
                        num:stx.search.num,
                        relatednum:stx.search.relatednum,
                        currentnavtab:stx.search.currentnavtab,
                        kbfilter:stx.search.kbfilter,
                        suggestionkeyword:stx.search.suggestionkeyword,
                        rclocale:stx.search.rclocale,
                       requiredfields:stx.search.requiredfields,
                       switchSpellingSuggestion:"0"
                      },
                      stx.search.pageTitle, "?keyword="+stx.search.keyword+
                      "&tab="+stx.search.currentnavtab+
                      "&start="+stx.search.start+
                      "&r="+stx.search.requiredfields+
                      "&kbfilter="+stx.search.kbfilter+
                      "&sugg="+
                      "&s=0");
                      
                    stx.search.forceHideSuggestionDiv();
                }  
            });
            
            /*
             bind click event for search button
             * */
            $("#searchSubmitButton").click(function(event){
                stx.search.initLoad="true";
                stx.search.keyword=$("#searchPageBox").val();
                stx.search.start="0";
                stx.search.requiredfields="";
                stx.search.kbfilter="";
                stx.search.suggestionkeyword="";
                History.pushState({keyword:stx.search.keyword, 
                        start:stx.search.start,
                        num:stx.search.num,
                        relatednum:stx.search.relatednum,
                        currentnavtab:stx.search.currentnavtab,
                        kbfilter:stx.search.kbfilter,
                        suggestionkeyword:stx.search.suggestionkeyword,
                        rclocale:stx.search.rclocale,
                        requiredfields:stx.search.requiredfields,
                        switchSpellingSuggestion:"0"
                        },
                        stx.search.pageTitle, "?keyword="+stx.search.keyword+
                        "&tab="+stx.search.currentnavtab+
                        "&start="+stx.search.start+
                        "&r="+stx.search.requiredfields+
                        "&kbfilter="+stx.search.kbfilter+
                        "&sugg="+
                        "&s=0");
                stx.search.forceHideSuggestionDiv();
            });
            
            /*
             bind click event for each tab on tab nav
             * */
            $("ul.search-nav.nav.nav-tabs > li").each(function(index){
                
                $(this).click(function(event){
                    
                    event.preventDefault();

                        this.currentnavtab=$(this).attr("id");
                        var ss_="0";
                        
                        if(stx.search.switchSpellingSuggestion=="5"){
                            ss_="5";    
                        }else{
                            ss_="1";
                             stx.search.switchSpellingSuggestion="1";
                                        if(stx.search.suggestionkeyword!=""){
                                            stx.search.keyword=stx.search.suggestionkeyword;
                                            $("#searchPageBox").val(stx.search.suggestionkeyword);
                                        }
                                    }
                        if($(this).attr("id")=="nav-tabs-all"){
                            stx.search.initLoad="false";
                            stx.search.site = stx.search.allCollectionSite;
                            if(stx.search.initLoading!="true"){
                               stx.search.start ="0"; 
                            }
                            stx.search.currentnavtab="nav-tabs-all";
                            stx.search.resetKbfilter();
                            
                            stx.search.updateTitle(stx.search.searchResultsAllTitle);
                            stx.search.activeTabs("nav-tabs-all");
                            
                            History.pushState({keyword:stx.search.keyword, 
                            start:stx.search.start,
                            num:stx.search.num,
                            relatednum:stx.search.relatednum,
                            currentnavtab:stx.search.currentnavtab,
                            kbfilter:stx.search.kbfilter,
                            suggestionkeyword:stx.search.suggestionkeyword,
                            rclocale:stx.search.rclocale,
                            requiredfields:stx.search.requiredfields,
                            switchSpellingSuggestion:ss_
                            },
                            stx.search.pageTitle, "?keyword="+stx.search.keyword+
                            "&tab="+stx.search.currentnavtab+
                            "&start="+stx.search.start+
                            "&r="+stx.search.requiredfields+
                            "&kbfilter="+stx.search.kbfilter+
                            "&sugg="+stx.search.suggestionkeyword+
                            "&s="+ss_);
                            stx.search.forceShowRightSection("search-results-right-ps");
                            stx.search.forceShowRightSection("search-results-right-sp");
                            stx.search.forceShowRightSection("search-results-right-articles");
                            stx.search.forceShowRightSection("search-results-right-kb");
                            stx.search.moveKbFilter("down");
                            
                        }else if($(this).attr("id")=="nav-tabs-ps"){
                            stx.search.initLoad="false";
                            stx.search.site = stx.search.productFinderSite;
                            
                            if(stx.search.initLoading!="true"){
                               stx.search.start ="0"; 
                            }
                            stx.search.currentnavtab="nav-tabs-ps";
                            stx.search.resetKbfilter();
                            
                            stx.search.updateTitle(stx.search.searchResultsPsTitle);
                            stx.search.activeTabs("nav-tabs-ps");
                            
                            History.pushState({keyword:stx.search.keyword, 
                            start:stx.search.start,
                            num:stx.search.num,
                            relatednum:stx.search.relatednum,
                            currentnavtab:stx.search.currentnavtab,
                            kbfilter:stx.search.kbfilter,
                            suggestionkeyword:stx.search.suggestionkeyword,
                             rclocale:stx.search.rclocale,
                            requiredfields:stx.search.requiredfields,
                            switchSpellingSuggestion:ss_
                            },
                            stx.search.pageTitle, "?keyword="+stx.search.keyword+
                            "&tab="+stx.search.currentnavtab+
                            "&start="+stx.search.start+
                            "&r="+stx.search.requiredfields+
                            "&kbfilter="+stx.search.kbfilter+
                            "&sugg="+stx.search.suggestionkeyword+
                            "&s="+ss_);
                            stx.search.forceHideRightSection("search-results-right-ps");
                            stx.search.forceShowRightSection("search-results-right-sp");
                            stx.search.forceShowRightSection("search-results-right-articles");
                            stx.search.forceShowRightSection("search-results-right-kb");
                            stx.search.moveKbFilter("down");
                            
        
                        }else if($(this).attr("id")=="nav-tabs-sp"){
                            stx.search.initLoad="false";
                            stx.search.site = stx.search.supportSite;
                            
                            if(stx.search.initLoading!="true"){
                               stx.search.start ="0"; 
                            }
                            stx.search.currentnavtab="nav-tabs-sp";
                            stx.search.resetKbfilter();
                            
                            stx.search.updateTitle(stx.search.searchResultsSpTitle);
                            stx.search.activeTabs("nav-tabs-sp");
                            History.pushState({keyword:stx.search.keyword, 
                            start:stx.search.start,
                            num:stx.search.num,
                            relatednum:stx.search.relatednum,
                            currentnavtab:stx.search.currentnavtab,
                            kbfilter:stx.search.kbfilter,
                            suggestionkeyword:stx.search.suggestionkeyword,
                             rclocale:stx.search.rclocale,
                            requiredfields:stx.search.requiredfields,
                            switchSpellingSuggestion:ss_
                            },
                            stx.search.pageTitle, "?keyword="+stx.search.keyword+
                            "&tab="+stx.search.currentnavtab+
                            "&start="+stx.search.start+
                            "&r="+stx.search.requiredfields+
                            "&kbfilter="+stx.search.kbfilter+
                            "&sugg="+stx.search.suggestionkeyword+
                            "&s="+ss_);
                            stx.search.forceHideRightSection("search-results-right-sp");
                            stx.search.forceShowRightSection("search-results-right-ps");
                            stx.search.forceShowRightSection("search-results-right-articles");
                            stx.search.forceShowRightSection("search-results-right-kb");
                            stx.search.moveKbFilter("down");
                            
                        }else if($(this).attr("id")=="nav-tabs-kb"){
                            stx.search.initLoad="false";
                            stx.search.site = stx.search.kbSite;
                             stx.search.currentnavtab="nav-tabs-kb";
                            stx.search.updateTitle(stx.search.searchResultsKbTitle);
                            stx.search.activeTabs("nav-tabs-kb");
                            if(stx.search.initLoading!="true"){
                               stx.search.start ="0";
                                stx.search.resetKbfilter();
                                History.pushState({keyword:stx.search.keyword, 
                                start:stx.search.start,
                                num:stx.search.num,
                                relatednum:stx.search.relatednum,
                                currentnavtab:stx.search.currentnavtab,
                                kbfilter:stx.search.kbfilter,
                                suggestionkeyword:stx.search.suggestionkeyword,
                                rclocale:stx.search.rclocale,
                                requiredfields:stx.search.requiredfields,
                                switchSpellingSuggestion:ss_
                                },
                                stx.search.pageTitle, "?keyword="+stx.search.keyword+
                                "&tab="+stx.search.currentnavtab+
                                "&start="+stx.search.start+
                                "&r="+stx.search.requiredfields+
                                "&kbfilter="+stx.search.kbfilter+
                                "&sugg="+stx.search.suggestionkeyword+
                                "&s="+ss_);
                                stx.search.forceShowRightSection("search-results-right-ps");
                                stx.search.forceShowRightSection("search-results-right-sp");
                                stx.search.forceShowRightSection("search-results-right-articles");
                                stx.search.forceShowRightSection("search-results-right-kb");
                            }
                            
                           
                            
                            
                        }else if($(this).attr("id")=="nav-tabs-articles"){
                            stx.search.initLoad="false";
                            stx.search.site = stx.search.domoreSite;
                            
                            if(stx.search.initLoading!="true"){
                                stx.search.start ="0";
                            }
                            stx.search.currentnavtab="nav-tabs-articles";
                            stx.search.resetKbfilter();
                            
                            stx.search.updateTitle(stx.search.searchResultsDomoreTitle);
                            stx.search.activeTabs("nav-tabs-articles");
                            History.pushState({keyword:stx.search.keyword, 
                            start:stx.search.start,
                            num:stx.search.num,
                            relatednum:stx.search.relatednum,
                            currentnavtab:stx.search.currentnavtab,
                            kbfilter:stx.search.kbfilter,
                            suggestionkeyword:stx.search.suggestionkeyword,
                             rclocale:stx.search.rclocale,
                            requiredfields:stx.search.requiredfields,
                            switchSpellingSuggestion:ss_
                            },
                            stx.search.pageTitle, "?keyword="+stx.search.keyword+
                            "&tab="+stx.search.currentnavtab+
                            "&start="+stx.search.start+
                            "&r="+stx.search.requiredfields+
                            "&kbfilter="+stx.search.kbfilter+
                            "&sugg="+stx.search.suggestionkeyword+
                            "&s="+ss_);
                            stx.search.forceHideRightSection("search-results-right-articles");
                            stx.search.forceShowRightSection("search-results-right-ps");
                            stx.search.forceShowRightSection("search-results-right-sp");
                            stx.search.forceShowRightSection("search-results-right-kb");
                            stx.search.moveKbFilter("down");
                        }
                        
                    
                });
            });    
            
            this.showRelatedSection("search-results-right-sp",this.supportSite);
            this.showRelatedSection("search-results-right-articles",this.domoreSite);
            this.showRelatedSection("search-results-right-kb",this.kbSite);
            this.showRelatedSection("search-results-right-ps",this.productFinderSite);
            
            if(this.currentnavtab=="nav-tabs-sp"){
                this.initLoading="true";
                $("#nav-tabs-sp").click();
                this.showMainTab();
            }else if(this.currentnavtab=="nav-tabs-articles"){
                 this.initLoading="true";
                $("#nav-tabs-articles").click();
                this.showMainTab();
            }else if(this.currentnavtab=="nav-tabs-ps"){
                 this.initLoading="true";
                $("#nav-tabs-ps").click();
                this.showMainTab();
            }else if(this.currentnavtab=="nav-tabs-kb"){
                 this.initLoading="true";
                $("#nav-tabs-kb").click();
                this.showMainTab();
                this.updateKBfilter();
            }else{
                this.initLoading="true";
                this.showMainTab();
                
                
            }
            stx.search.initLoading="false";
            
        },
        getInitLoading:function(){
        },
        forceHideRightSection:function(sectionId){
            $("#"+sectionId).hide();
        },
        forceShowRightSection:function(sectionId){
            $("#"+sectionId).show();
        },
        forceHideSuggestionDiv: function(){
          $("ul.ui-autocomplete.ui-menu.ui-widget.ui-widget-content.ui-corner-all").hide();  
        },
        resetKbfilter:function(){
            this.requiredfields="";
            this.kbfilter=""; 
          
        },
        activeTabs:function(tabId){
            $("#"+tabId).removeClass('search-tab').addClass('active');
            $("#"+tabId).siblings().removeClass('active').addClass('search-tab');
        },
        
        updateHidden:function(){
    
            $("#keyword").val(this.keyword);
            $("#site").val(this.site);
            $("#currentnavtab").val(this.currentnavtab);
            $("#kbfilter").val(this.kbfilter);
            $("#start").val(this.start);
            $("#num").val(this.num);
            $("#client").val(this.client);
            
            $("#output").val(this.output);
            $("#ie").val(this.ie);
            $("#oe").val(this.oe);
            $("#tlen").val(this.tlen);
            $("#getfields").val(this.getfields);
            $("#lr").val(this.lr);
            $("#filter").val(this.filter);
            $("#sort").val(this.sort);
            $("#requiredfields").val(this.requiredfields);
            $("#rclocale").val(this.rclocale);
            $("#suggestionkeyword").val(this.suggestionkeyword);
            $("#switchSpellingSuggestion").val(this.switchSpellingSuggestion);
            
        },
        
        bottomPagination:function(index){
            this.initLoad="false";
            this.start=index;
            
        },
        
        showMainTab:function(){
    
            
            this.forceHideSuggestionDiv();
            $("#search-results-body").html(this.waitingText);
            $.ajax(
                    {
                        type:"post",
                        url:this.mainTabAjax,
                        cache:false,
                        timeout:30000,
                        data:{"site":this.site, 
                                "start":this.start, 
                                "num":this.num,
                                "client":this.client,
                                "output":this.output,
                                "ie":this.ie,
                                "oe":this.oe,
                                "tlen":this.tlen,
                                "getfields":this.getfields,
                                "lr":this.lr,
                                "filter":this.filter,
                                "sort":this.sort,
                                "q":this.keyword,
                                "requiredfields":this.requiredfields,
                                "rclocale":this.rclocale,
                                "searchUrlPrefix":this.searchUrlPrefix,
                                "switchSpellingSuggestion":this.switchSpellingSuggestion
                                },
                        beforeSend:function(){
                            stx.search.updateHidden();
                        },
                        success:function(msg){
                            $("#search-results-body").html(msg);
                            
                            if($("#spellingQueryHiddenDiv")[0]!=undefined){
                                
                                $("#search-term-suggestion").show();
                                $("#search-term-suggestion-instead").show();
                                $("#search-term-suggestion-do-you-mean").hide();
                                $("#spellingSuggestionHref").text($("#spellingQueryHiddenDiv").html());
                                $("#spellingQueryHref").text(stx.search.keyword);
                                $("#spellingDoYouMeanHref").text($("#spellingQueryHiddenDiv").html());
                                stx.search.suggestionkeyword=$("#spellingQueryHiddenDiv").html();
                                
                              
                               
                                if(stx.search.switchSpellingSuggestion=='1'||stx.search.switchSpellingSuggestion=='2'){
                                    $("#search-term-suggestion").hide();
                                    $("#search-term-suggestion-instead").hide();
                                    $("#search-term-suggestion-do-you-mean").hide();
                                }else if(stx.search.switchSpellingSuggestion=='5'){
                                    $("#search-term-suggestion").hide();
                                    $("#search-term-suggestion-instead").hide();
                                    $("#search-term-suggestion-do-you-mean").show();
                                    
                                }else{
                                    $("#search-term-suggestion").show();
                                    $("#search-term-suggestion-instead").show();
                                    $("#search-term-suggestion-do-you-mean").hide();
                                }
                                
                                
                                $("#spellingSuggestionHref").click(function(event){
                                    
                                    event.preventDefault();
                                    
                                    $("#searchPageBox").val(stx.search.suggestionkeyword);
                                    stx.search.keyword=stx.search.suggestionkeyword;
                                    stx.search.start="0";
                                    if(stx.search.currentnavtab=="nav-tabs-sp"){
                                        $("#nav-tabs-sp").click();
                                    }else if(stx.search.currentnavtab=="nav-tabs-articles"){
                                        $("#nav-tabs-articles").click();
                                    }else if(stx.search.currentnavtab=="nav-tabs-ps"){
                                        $("#nav-tabs-ps").click();
                                    }else if(stx.search.currentnavtab=="nav-tabs-kb"){
                                        $("#nav-tabs-kb").click();
                                        
                                    }else{
                                        $("#nav-tabs-all").click();
                                    }
                                    
                                });
                                $("#spellingQueryHref").click(function(event){
                                    event.preventDefault(); 
                                    stx.search.switchSpellingSuggestion="5";
                                    History.pushState({keyword:stx.search.keyword, 
                                    start:"0",
                                    num:stx.search.num,
                                    relatednum:stx.search.relatednum,
                                    currentnavtab:stx.search.currentnavtab,
                                    kbfilter:stx.search.kbfilter,
                                    suggestionkeyword:stx.search.suggestionkeyword,
                                    rclocale:stx.search.rclocale,
                                    requiredfields:stx.search.requiredfields,
                                    switchSpellingSuggestion:"5"
                                    },
                                    stx.search.pageTitle, "?keyword="+stx.search.keyword+
                                    "&tab="+stx.search.currentnavtab+
                                    "&start=0"+
                                    "&r="+stx.search.requiredfields+
                                    "&kbfilter="+stx.search.kbfilter+
                                    "&sugg="+stx.search.suggestionkeyword+
                                    "&s=5");
                                    stx.search.showRelatedSection("search-results-right-sp",stx.search.supportSite);
                                    stx.search.showRelatedSection("search-results-right-articles",stx.search.domoreSite);
                                    stx.search.showRelatedSection("search-results-right-kb",stx.search.kbSite);
                                    stx.search.showRelatedSection("search-results-right-ps",stx.search.productFinderSite);                                  
                                });
                                $("#spellingDoYouMeanHref").click(function(event){
                                    event.preventDefault(); 
                                    stx.search.switchSpellingSuggestion="6";
                                    
                                    stx.search.keyword=stx.search.suggestionkeyword;
                                    $("#searchPageBox").val(stx.search.suggestionkeyword);
                                    History.pushState({keyword:stx.search.keyword, 
                                    start:"0",
                                    num:stx.search.num,
                                    relatednum:stx.search.relatednum,
                                    currentnavtab:stx.search.currentnavtab,
                                    kbfilter:stx.search.kbfilter,
                                    suggestionkeyword:stx.search.suggestionkeyword,
                                    rclocale:stx.search.rclocale,
                                    requiredfields:stx.search.requiredfields,
                                    switchSpellingSuggestion:"6"
                                    },
                                    stx.search.keyword, "?keyword="+stx.search.keyword+
                                    "&tab="+stx.search.currentnavtab+
                                    "&start=0"+
                                    "&r="+stx.search.requiredfields+
                                    "&kbfilter="+stx.search.kbfilter+
                                    "&sugg="+stx.search.suggestionkeyword+
                                    "&s=6");
                                    
                                    stx.search.showRelatedSection("search-results-right-sp",stx.search.supportSite);
                                    stx.search.showRelatedSection("search-results-right-articles",stx.search.domoreSite);
                                    stx.search.showRelatedSection("search-results-right-kb",stx.search.kbSite);
                                    stx.search.showRelatedSection("search-results-right-ps",stx.search.productFinderSite);                                  
                                });
                                
                            }else{
                                $("#search-term-suggestion").hide();
                                $("#search-term-suggestion-instead").hide();
                                $("#search-term-suggestion-do-you-mean").hide();
                                if(stx.search.switchSpellingSuggestion=="5"){
                                    $("#search-term-suggestion-do-you-mean").show();
                                }
                            }
                            
                            var prevPageNum=0;
                            var nextPageNum=0;
                            
                            if($("#prevPageNum")[0]){
                                prevPageNum=$("#prevPageNum").text();
                                $("li > a.arrow-button.previous").click(function(event){
                                    event.preventDefault();
                                    if(stx.search.switchSpellingSuggestion!="5"){
                                        stx.search.switchSpellingSuggestion="1";
                                        if(stx.search.suggestionkeyword!=""){
                                            stx.search.keyword=stx.search.suggestionkeyword;
                                            $("#searchPageBox").val(stx.search.suggestionkeyword);
                                        }   
                                    }
                                    
                                    
                                    stx.search.bottomPagination(prevPageNum);
                                    History.pushState({keyword:stx.search.keyword, 
                                    start:prevPageNum,
                                    num:stx.search.num,
                                    relatednum:stx.search.relatednum,
                                    currentnavtab:stx.search.currentnavtab,
                                    kbfilter:stx.search.kbfilter,
                                    suggestionkeyword:stx.search.suggestionkeyword,
                                     rclocale:stx.search.rclocale,
                                    requiredfields:stx.search.requiredfields,
                                    switchSpellingSuggestion:stx.search.switchSpellingSuggestion
                                    },
                                    stx.search.pageTitle, "?keyword="+stx.search.keyword+
                                    "&tab="+stx.search.currentnavtab+
                                    "&start="+prevPageNum+
                                    "&r="+stx.search.requiredfields+
                                    "&kbfilter="+stx.search.kbfilter+
                                    "&sugg="+stx.search.suggestionkeyword+
                                    "&s="+stx.search.switchSpellingSuggestion);
                                    
                                });
                            }
                            
                            if($("#nextPageNum")[0]){
                                nextPageNum=$("#nextPageNum").text();
                                $("li > a.arrow-button.next").click(function(event){
                                    
                                    event.preventDefault();
                                    
                                    if(stx.search.switchSpellingSuggestion!="5"){
                                        stx.search.switchSpellingSuggestion="1";
                                        if(stx.search.suggestionkeyword!=""){
                                            stx.search.keyword=stx.search.suggestionkeyword;
                                            $("#searchPageBox").val(stx.search.suggestionkeyword);
                                        }   
                                    }
                                    stx.search.bottomPagination(nextPageNum);
                                    History.pushState({keyword:stx.search.keyword, 
                                    start:nextPageNum,
                                    num:stx.search.num,
                                    relatednum:stx.search.relatednum,
                                    currentnavtab:stx.search.currentnavtab,
                                    kbfilter:stx.search.kbfilter,
                                    suggestionkeyword:stx.search.suggestionkeyword,
                                    rclocale:stx.search.rclocale,
                                    requiredfields:stx.search.requiredfields,
                                    switchSpellingSuggestion:stx.search.switchSpellingSuggestion
                                    },
                                    stx.search.pageTitle, "?keyword="+stx.search.keyword+
                                    "&tab="+stx.search.currentnavtab+
                                    "&start="+nextPageNum+
                                    "&r="+stx.search.requiredfields+
                                    "&kbfilter="+stx.search.kbfilter+
                                    "&sugg="+stx.search.suggestionkeyword+
                                    "&s="+stx.search.switchSpellingSuggestion);
                                    
                                });
                            }
                            
                            $("li.hidden-phone").each(function(index) {
                                
                                var htmlDisplayNumberIndex = $(this).find("a").text();
                                var gsaStartIndex = (htmlDisplayNumberIndex-1)*stx.search.num;
                                $(this).click(function(event){
                                    
                                    event.preventDefault();
                                    
                                    if(!$(this).hasClass("active")){
                                        
                                        if(stx.search.switchSpellingSuggestion!="5"){
                                            stx.search.switchSpellingSuggestion="1";
                                            if(stx.search.suggestionkeyword!=""){
                                                stx.search.keyword=stx.search.suggestionkeyword;
                                                $("#searchPageBox").val(stx.search.suggestionkeyword);
                                            }
                                        }
                                        stx.search.bottomPagination(gsaStartIndex);
                                        History.pushState({keyword:stx.search.keyword, 
                                        start:gsaStartIndex,
                                        num:stx.search.num,
                                        relatednum:stx.search.relatednum,
                                        currentnavtab:stx.search.currentnavtab,
                                        kbfilter:stx.search.kbfilter,
                                        suggestionkeyword:stx.search.suggestionkeyword,
                                        rclocale:stx.search.rclocale,
                                        requiredfields:stx.search.requiredfields,
                                        switchSpellingSuggestion:stx.search.switchSpellingSuggestion
                                        },
                                        stx.search.pageTitle, "?keyword="+stx.search.keyword+
                                        "&tab="+stx.search.currentnavtab+
                                        "&start="+gsaStartIndex+
                                        "&r="+stx.search.requiredfields+
                                        "&kbfilter="+stx.search.kbfilter+
                                        "&sugg="+stx.search.suggestionkeyword+
                                        "&s="+stx.search.switchSpellingSuggestion);
                                    
                                    }
                                    
                                });
                            });
    
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            $("#search-results-body").html("<!--"+errorThrown+"-->");
                            
                        }
                        
                        
                    }
                );
        },
        
       
        
        showRelatedSection:function(sectionId, collection){
            
            if(this.keyword==""){
                return;
            }
            $("#"+sectionId).html(this.waitingText);
            var related_products="";
            if(sectionId=="search-results-right-ps"){
            	var gsalang = this.rclocale;
            	gsalang = gsalang.toLowerCase().replace("_","-");
                related_products="(relatedproducts:true).(lang:"+gsalang+")";
            }else if(sectionId=="search-results-right-kb"){

               related_products = stx.search.requiredfields;
            }
            
            $.ajax(
                    {
                        type:"post",
                        url:this.relatedAjax,
                        cache:false,
                        timeout:30000,
                        data:{"site":collection, 
                                "start":"0", 
                                "num":this.relatednum,
                                "client":this.client,
                                "output":this.output,
                                "ie":this.ie,
                                "oe":this.oe,
                                "tlen":this.tlen,
                                "getfields":this.getfields,
                                "lr":this.lr,
                                "filter":this.filter,
                                "sort":this.sort,
                                "q":this.keyword,
                                "requiredfields":related_products,
                                "sectionId":sectionId,
                                "rclocale":this.rclocale,
                                "searchUrlPrefix":this.searchUrlPrefix,
                                "switchSpellingSuggestion":this.switchSpellingSuggestion,
                                },
                        beforeSend:function(){
                            stx.search.updateHidden();
                        },
                        success:function(msg){
                           
                            $("#"+sectionId).html(msg);
                            
                            if(sectionId=="search-results-right-sp"){
                                
                                $("#search-results-right-sp-link").click(function(event){
                                    event.preventDefault();
                                    $("#nav-tabs-sp").click();
                                    
                                });
                            }else if(sectionId=="search-results-right-articles"){
                                
                                $("#search-results-right-articles-link").click(function(event){
                                    event.preventDefault();
                                    $("#nav-tabs-articles").click();
                                    
                                });
                            }else if(sectionId=="search-results-right-ps"){
                                
                                $("#search-results-right-ps-link").click(function(event){
                                    event.preventDefault();
                                    $("#nav-tabs-ps").click();
                                    
                                });
                            }else if(sectionId=="search-results-right-kb"){
                                
                                $("#search-results-right-kb-link").click(function(event){
                                    
                                    event.preventDefault();
                                    $("#nav-tabs-kb").click();
                                    //stx.search.updateKBfilter();
                                });
                            }
                                                  
    
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            $("#"+sectionId).html("<!--"+errorThrown+"-->");
                        }
                        
                        
                    }
                );
        },
        
        updateKBfilter:function(){
            if(this.keyword==""){
                return;
            }
            $("#search-results-right-kb-filter").show();
            $("#search-results-right-kb-filter").html(this.waitingText);
            $.ajax(
                    {
                        type:"post",
                        url:this.kbfilterAjax,
                        cache:false,
                        timeout:30000,
                        data:{"site":this.kbSite, 
                                "start":"0", 
                                "num":this.num,
                                "client":this.kbclient,
                                "output":this.output,
                                "ie":this.ie,
                                "oe":this.oe,
                                "tlen":this.tlen,
                                "getfields":this.getfields,
                                "lr":this.lr,
                                "filter":this.filter,
                                "sort":this.sort,
                                "q":this.keyword,
                                "requiredfields":this.requiredfields,
                                "rclocale":this.rclocale,
                                "searchUrlPrefix":this.searchUrlPrefix,
                                "switchSpellingSuggestion":this.switchSpellingSuggestion
                                },
                        success:function(msg){
                                
                                $("#search-results-right-kb-filter").html(msg);
                                
                                $('input.kb.checkbox').click(function(event){
                                    if($(this).attr("checked")){
                                        $(this).parent().parent().siblings("li").each(function(){
                                        var checkbox=$(this).find("input.kb.checkbox");
                                          
                                          checkbox.attr("checked",false);
                                        });
                                        stx.search.kbfilter= $(this).attr("value");
                                        stx.search.requiredfields = $(this).parents("div.collapse").prev().find("a.accordion-toggle.search-filter-kb-toggle").text();
                                        stx.search.requiredfields = "("+$.trim(stx.search.requiredfields)+":"+$.trim(stx.search.kbfilter)+")";
                                        stx.search.start="0";
                                        stx.search.site=stx.search.kbSite;
                                        History.pushState({keyword:stx.search.keyword, 
                                        start:stx.search.start,
                                        num:stx.search.num,
                                        relatednum:stx.search.relatednum,
                                        currentnavtab:stx.search.currentnavtab,
                                        kbfilter:stx.search.kbfilter,
                                        suggestionkeyword:stx.search.suggestionkeyword,
                                        rclocale:stx.search.rclocale,
                                        requiredfields:stx.search.requiredfields,
                                        switchSpellingSuggestion:stx.search.switchSpellingSuggestion
                                        },
                                        stx.search.pageTitle, "?keyword="+stx.search.keyword+
                                        "&tab="+stx.search.currentnavtab+
                                        "&start="+stx.search.start+
                                        "&r="+stx.search.requiredfields+
                                        "&kbfilter="+stx.search.kbfilter+
                                        "&sugg="+stx.search.suggestionkeyword+
                                        "&s="+stx.search.switchSpellingSuggestion);
                                        //stx.search.updateKBfilter();
                                        
                                    }else{
                                        stx.search.kbfilter="";
                                        stx.search.requiredfields = "";
                                        stx.search.start="0";
                                        stx.search.site=stx.search.kbSite;

                                        History.pushState({keyword:stx.search.keyword, 
                                        start:stx.search.start,
                                        num:stx.search.num,
                                        relatednum:stx.search.relatednum,
                                        currentnavtab:stx.search.currentnavtab,
                                        kbfilter:stx.search.kbfilter,
                                        suggestionkeyword:stx.search.suggestionkeyword,
                                        rclocale:stx.search.rclocale,
                                        requiredfields:stx.search.requiredfields,
                                        switchSpellingSuggestion:stx.search.switchSpellingSuggestion
                                        },
                                        stx.search.pageTitle, "?keyword="+stx.search.keyword+
                                        "&tab="+stx.search.currentnavtab+
                                        "&start="+stx.search.start+
                                        "&r="+stx.search.requiredfields+
                                        "&kbfilter="+stx.search.kbfilter+
                                        "&sugg="+stx.search.suggestionkeyword+
                                        "&s="+stx.search.switchSpellingSuggestion);
                                        //stx.search.updateKBfilter();
                                    }
                                    
                                });
                                if(stx.search.kbfilter!=""){
                                      var flag="false";
                                      var accordion_group_kb=$("div.accordion-group.kb");
                                      
                                      accordion_group_kb.each(function(index){
                                        var accordion_group_kb_obj = $(this);
                                        var according_heading = accordion_group_kb_obj.find("div.accordion-heading");
                                        var according_body = accordion_group_kb_obj.find("div.accordion-body.collapse");
                                        var li=accordion_group_kb_obj.find("div.search-filter-kb-list.accordion-inner").find("li");
                                        
                                        li.each(function(index_){
                                          var check=$(this).find("input:checkbox");
                                          if(index_!=5){
                                              if(check.attr("value")==stx.search.kbfilter){
                                                flag="true";
                                                check.attr("checked",true);
                                              }
                                          }
                                          
                                         
                                        });
                                        if(flag=="true"){
                                          according_heading.addClass("open");
                                          according_body.eq(0).addClass("in");
                                        }else{
                                          according_heading.removeClass("open");
                                          according_body.eq(0).removeClass("in");
                                        }
                                        flag="false";
                                       
                                      });
                                }
                                                     
                                /**
                                    * Add accordion toggle to have specific class for the toggled on/off state.
                                */
                                $('.collapse').on('show', function(e){
                                      e.stopPropagation(); //prevent nested accordion conflict    
                                      $(this).siblings().addClass('open'); //add active state to button on open
                                });
                                    
                                $('.collapse').on('hide', function(e){
                                      e.stopPropagation();            
                                      $(this).siblings().removeClass('open'); //remove active state to button on close
                                });
                                    
                                /**
                                 * Click on checkbox to trigger bootstrap collapse toggle on a empty anchor tag,
                                 * Since collapse does not working on label or input in IE
                                */
                                if ($(".search-filter-kb-more-heading input").length > 0) {
                                      var moreCheckbox = $(".search-filter-kb-more-heading input");
                                      $(moreCheckbox).click(function() {
                                          $(this).parent().siblings().click();
                                      });
                                }
                                    
                                $("a.btn.reset.filter.kb").click(function(){
                                      stx.search.requiredfields="";
                                      stx.search.kbfilter="";
                                      History.pushState({keyword:stx.search.keyword, 
                                        start:"0",
                                        num:stx.search.num,
                                        relatednum:stx.search.relatednum,
                                        currentnavtab:stx.search.currentnavtab,
                                        kbfilter:stx.search.kbfilter,
                                        suggestionkeyword:stx.search.suggestionkeyword,
                                        rclocale:stx.search.rclocale,
                                        requiredfields:stx.search.requiredfields,
                                        switchSpellingSuggestion:stx.search.switchSpellingSuggestion
                                        },
                                        stx.search.pageTitle, "?keyword="+stx.search.keyword+
                                        "&tab="+stx.search.currentnavtab+
                                        "&start=0&r="+stx.search.requiredfields+
                                        "&kbfilter="+stx.search.kbfilter+
                                        "&sugg="+stx.search.suggestionkeyword+
                                        "&s="+stx.search.switchSpellingSuggestion);
                                      stx.search.resetKbfilter();
                                      //stx.search.updateKBfilter();
                                      stx.search.moveKbFilter("up");
                                });
                                
                                stx.search.moveKbFilter("up");
                               
    
                        },
                        error: function (jqXHR, textStatus, errorThrown) {
                            $("#search-results-right-kb-filter").html("<!--"+errorThrown+"-->");
                        }
                        
                        
                    }
                );
        },
        
        moveKbFilter:function(top){
            
            if(top=="up"){
                $("#search-results-right-kb").hide();
            }else if(top=="down"){
                $("#search-results-right-kb").show();
                $("#search-results-right-kb-filter").hide();
            }
        },
        
        
        
        
        /**
         * Update the page title with the search filter name that is passed. Requires DV59 or DV60 to be on page but will check for the presence of the block
         * before executing
         */
        updateTitle: function(filterName) {
            if($('.page-title').length > 0) {
                $('.page-title').html("<h1 class=\"page-title-heading\">"+filterName+"</h1>");
            }
        },
              
        
        submitSearch:function(event){
            this.keyword=$("#searchPageBox").val();
            if(this.keyword==""){
                $("form.form-search").addClass("error");
                return false;
            }else{
                $("form.form-search").removeClass("error");
            }
            
            var requiredfields_=this.requiredfields;
            if(this.currentnavtab=="nav-tabs-all"){
                this.site=this.allCollectionSite;
                this.requiredfields="";
                stx.search.forceShowRightSection("search-results-right-ps");
                stx.search.forceShowRightSection("search-results-right-sp");
                stx.search.forceShowRightSection("search-results-right-articles");
                stx.search.forceShowRightSection("search-results-right-kb");
                stx.search.moveKbFilter("down");
                
            }else if(this.currentnavtab=="nav-tabs-articles"){
                this.site=this.domoreSite;
                this.requiredfields="";
                stx.search.forceShowRightSection("search-results-right-ps");
                stx.search.forceShowRightSection("search-results-right-sp");
                stx.search.forceHideRightSection("search-results-right-articles");
                stx.search.forceShowRightSection("search-results-right-kb");
                stx.search.moveKbFilter("down");
            }else if(this.currentnavtab=="nav-tabs-ps"){
                this.site=this.productFinderSite;
                this.requiredfields="";
                stx.search.forceHideRightSection("search-results-right-ps");
                stx.search.forceShowRightSection("search-results-right-sp");
                stx.search.forceShowRightSection("search-results-right-articles");
                stx.search.forceShowRightSection("search-results-right-kb");
                stx.search.moveKbFilter("down");
            }else if(this.currentnavtab=="nav-tabs-kb"){
                this.site=this.kbSite;
                stx.search.forceShowRightSection("search-results-right-ps");
                stx.search.forceShowRightSection("search-results-right-sp");
                stx.search.forceShowRightSection("search-results-right-articles");
                stx.search.forceHideRightSection("search-results-right-kb");
                stx.search.moveKbFilter("up");
            }else if(this.currentnavtab=="nav-tabs-sp"){
                this.site=this.supportSite;
                this.requiredfields="";
                stx.search.forceShowRightSection("search-results-right-ps");
                stx.search.forceHideRightSection("search-results-right-sp");
                stx.search.forceShowRightSection("search-results-right-articles");
                stx.search.forceShowRightSection("search-results-right-kb");
                stx.search.moveKbFilter("down");
            }else{
                this.site=this.allCollectionSite;
                this.requiredfields="";
                stx.search.forceShowRightSection("search-results-right-ps");
                stx.search.forceShowRightSection("search-results-right-sp");
                stx.search.forceShowRightSection("search-results-right-articles");
                stx.search.forceShowRightSection("search-results-right-kb");
                stx.search.moveKbFilter("down");
            }
            this.forceHideSuggestionDiv();
            this.showMainTab();
            this.requiredfields=requiredfields_;
            if(this.initLoad=="true"){
                this.showRelatedSection("search-results-right-sp",this.supportSite);
                this.showRelatedSection("search-results-right-articles",this.domoreSite);
                
                this.showRelatedSection("search-results-right-ps",this.productFinderSite);
                this.showRelatedSection("search-results-right-kb",this.kbSite);
                if(this.currentnavtab=="nav-tabs-kb"){
                    this.updateKBfilter();
                    
                }else{
                    
                    stx.search.moveKbFilter("down");
                }
            }else{
                if(this.currentnavtab=="nav-tabs-kb"){
                    
                    this.updateKBfilter();
                }else{
                    stx.search.moveKbFilter("down");
                    
                }
            }
            
            if(stx.search.currentnavtab=="nav-tabs-all"){
                stx.search.updateTitle(stx.search.searchResultsAllTitle);
            }else if(stx.search.currentnavtab=="nav-tabs-ps"){
                stx.search.updateTitle(stx.search.searchResultsPsTitle);
            }else if(stx.search.currentnavtab=="nav-tabs-sp"){
                stx.search.updateTitle(stx.search.searchResultsSpTitle);
            }else if(stx.search.currentnavtab=="nav-tabs-kb"){
                stx.search.updateTitle(stx.search.searchResultsKbTitle);
            }else if(stx.search.currentnavtab=="nav-tabs-articles"){
                stx.search.updateTitle(stx.search.searchResultsDomoreTitle);
            }else{
                stx.search.updateTitle(stx.search.searchResultsAllTitle);
            }
            
           
        },
        
        
        
        
    };
    
    // Initialize and run functions
    
    /*$.extend({
      getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
        }
        return vars;
      },
      getUrlVar: function(name){
        var value = $.getUrlVars()[name];
        if(value==undefined){
            value="";
        }
        return value;
      }
    });*/
    
    $(document).ready(function() {
        // Get object of URL parameters
        var allVars = $.getUrlVars();
    
        // Getting URL var by its name
        var byKeyword = decodeURI($.getUrlVar('keyword'));
        
        var tab = $.getUrlVar('tab');
        
        var start = $.getUrlVar('start');
        
        var requiredfields=$.getUrlVar('r');
        var kbfilter=$.getUrlVar('kbfilter');
        
        var switchSpelling = $.getUrlVar('s');
        var sugg=$.getUrlVar('sugg');
        
       
        
        if($("#search-results-body")[0]){
            var History = window.History;
            var State = History.getState();
            
            History.Adapter.bind(window,'statechange',function(event){
                 var State = History.getState();
                     var url= State.url;
                     var History_Data=State.data;
                     var History_Data_keyword=History_Data.keyword;
                     if(History_Data_keyword==undefined){
                     
                    }else{
                       
                    
                     var History_Data_currentnavtab=History_Data.currentnavtab;
                     var History_Data_suggestionkeyword=History_Data.suggestionkeyword;
                     var History_Data_kbfilter=History_Data.kbfilter;
                     var History_Data_start=History_Data.start;
                     var History_Data_requiredfields=History_Data.requiredfields;
                     var History_Data_switchSpellingSuggestion= History_Data.switchSpellingSuggestion
                     
                     stx.search.keyword =History_Data_keyword;
                     stx.search.currentnavtab=History_Data_currentnavtab;
                     stx.search.start=History_Data_start;
                     stx.search.requiredfields=History_Data_requiredfields;
                     stx.search.kbfilter=History_Data_kbfilter;
                     stx.search.switchSpellingSuggestion=History_Data_switchSpellingSuggestion;
                     stx.search.suggestionkeyword=History_Data_suggestionkeyword;
                     $("#searchPageBox").val(History_Data_keyword);
                     stx.search.activeTabs(stx.search.currentnavtab);
                     stx.search.submitSearch(event);
                    }
                     
                 
                    
            });
            stx.search.keyword =byKeyword;
            stx.search.currentnavtab=tab;
            stx.search.start=start;
            stx.search.requiredfields=requiredfields;
            stx.search.kbfilter=kbfilter;
            stx.search.switchSpellingSuggestion=switchSpelling;
            stx.search.suggestionkeyword=sugg;
            if(stx.search.switchSpellingSuggestion==""){
                stx.search.switchSpellingSuggestion="0";
            }
           
            if(stx.search.currentnavtab==""){
                stx.search.currentnavtab="nav-tabs-all";
            }
            if(stx.search.start==""){
                stx.search.start="0";
            }
            
            
            $("#searchPageBox").val(byKeyword);
            stx.search.initLoading="true";
            stx.search.init();
        }
        
        if($("#searchPageBox")[0]){
           var listener = window.addEventListener;
           var eventType = "load";
    
           if(!listener){
                listener = window.attachEvent;
                eventType = "onload";
           }
    
           listener( eventType, function(){
               $("#searchPageBox").autocomplete({
            	   source: "/ww/autoSuggest?site="+gsaSite+"&host="+gsaURL+"&rcLocaleJS="+rcLocaleJS,
                   select: function( event, item ) {
                            $("#searchPageBox").val(item.item.value);
                            stx.search.keyword=item.item.value;
                            stx.search.initLoad="true";
                            stx.search.start="0";
                            stx.search.requiredfields="";
                            stx.search.kbfilter="";
                            stx.search.suggestionkeyword="";
                            History.pushState({keyword:stx.search.keyword, 
                                start:stx.search.start,
                                num:stx.search.num,
                                relatednum:stx.search.relatednum,
                                currentnavtab:stx.search.currentnavtab,
                                kbfilter:stx.search.kbfilter,
                                suggestionkeyword:stx.search.suggestionkeyword,
                                rclocale:stx.search.rclocale,
                               requiredfields:stx.search.requiredfields,
                               switchSpellingSuggestion:"0"
                              },
                              stx.search.pageTitle, "?keyword="+stx.search.keyword+
                              "&tab="+stx.search.currentnavtab+
                              "&start="+stx.search.start+
                              "&r="+stx.search.requiredfields+
                              "&kbfilter="+stx.search.kbfilter+
                              "&sugg="+
                              "&s=0");
                              
                            stx.search.forceHideSuggestionDiv();
                   }
              });
            }, false );
        }
       
           
    });

}

var initalPageLoad=true;
var loadingTimes=0;
var countOfKBDiv=0;
var firstTagFlag = "all";
var showPcFlag = "false";
var showMacFlag = "false";
var showOtherFlag ="false";
var showAllFlag = "false";
// function to load kb data

function supportPDP(obj){
	var pdh_marketing_name = $(obj).find("input[name='pdh_marketing_name']").val();
	var pdp_locale= $(obj).find("input[name='pdp_locale']").val();
	var pdp_kb_page_id = $(obj).find("input[name='pdp_kb_page_id']").val();
	var pdp_text_label = $(obj).find("input[name='pdp_text_label']").val();
	var pdp_os=$("#pdp_os").val();
	var pdp_locale=$("#pdp_locale").val();
	var pdp_searchurlprefix=$("#pdp_searchurlprefix").val();
	var pdp_search_client = $("#pdp_search_client").val();
	var pdp_search_lr=$("#pdp_search_lr").val();
    var pdp_requiredfields="";
    if($.trim(pdp_os)==""){
        var pdp_requiredfields="(pdp_kb:true)"+"."+"(locale:"+pdp_locale+")";
    }else{
        var pdp_requiredfields="(pdp_kb:true)"+"."+"(os:"+pdp_os+")"+"."+"(locale:"+pdp_locale+")";
    }    
    var pdh_marketing_name_array= pdh_marketing_name.split(",");
    if(pdh_marketing_name_array!=null && pdh_marketing_name_array.length>0){    
        pdp_requiredfields=pdp_requiredfields+".";
        for(var i=0;i<pdh_marketing_name_array.length;i++){
            if(i!=pdh_marketing_name_array.length-1){
                var pdh_marketing_name_val=doubleEncoding(pdh_marketing_name_array[i]);
                pdp_requiredfields=pdp_requiredfields+"(pdh_marketing_name:"+pdh_marketing_name_val+")"+"|";
            }else{
                var pdh_marketing_name_val=doubleEncoding(pdh_marketing_name_array[i]);
                pdp_requiredfields=pdp_requiredfields+"(pdh_marketing_name:"+pdh_marketing_name_val+")";
            }
            
        }
    }
 // ajax call to load the kb data
    $.ajax(
                   {
                       type:"post",
                       url:"/ww/universal/display-views/support-pdp-kb-ajax.jsp",
                       cache:false,
                       timeout:30000,
                       data:{"site":"pdp_kb", 
                               "start":"0", 
                               "num":"100",
                               "client":pdp_search_client,
                               "output":"xml_no_dtd",
                               "ie":"utf8",
                               "oe":"utf8",
                               "tlen":"100",
                               "getfields":"*",
                               "lr":pdp_search_lr,
                               "filter":"0",
                               "sort":"date:D:L:d1",
                               "q":"",
                               "requiredfields":pdp_requiredfields,
                               "rclocale":pdp_locale,
                               "searchUrlPrefix":pdp_searchurlprefix,
                               "maxlength":"4",
                               "textlabel": pdp_text_label,
                               "pageId": pdp_kb_page_id
                               },
                       beforeSend:function(){
                          
                       },
                       success:function(msg){
                           $("div.support-kb-items.support-pdp."+pdp_kb_page_id+"").html(msg);
                           loadingTimes++;
                           if($("#totalRecord"+pdp_kb_page_id+"").val()!="0"){
                               collapseArrow();
                               initalKBTag(pdp_kb_page_id);
                           }
                           
                       },
                       error: function (jqXHR, textStatus, errorThrown) {
                    	   loadingTimes++;
                           $("div.support-kb-items.support-pdp."+pdp_kb_page_id+"").html("<!--"+errorThrown+"-->");
                       }
                   }
               );
}

$(document).ready(function(){
    // check if kb item data div is exist or not
	/*
    if($("div.support-kb-items.support-pdp")[0]){
    	countOfKBDiv = $("div.pdp_kb_hidden").length;
    	
    	$("div.pdp_kb_hidden").each(function(){
    		
    		supportPDP(this);
    	});

        
        //bind the click event for os links when changing the os value
        
       $(".button.support.pdp.kb.tag").click(function(event){
           
            event.preventDefault();
            if($(this).hasClass("button-teal")){
            	return;
            }
            var buttonamount= $(".button.support.pdp.kb.tag").length;
            
            if(buttonamount!=1){
                var pdp_os=$(this).attr("value").toUpperCase();
            
                if(pdp_os=="MAC"){
                	changeButtonColor("mac");
                    $("#firstTagFlag_").val("mac");
                    pdp_os="Apple";
                    
                }else if(pdp_os=="PC"){
                	changeButtonColor("pc");
                    $("#firstTagFlag_").val("pc");
                    pdp_os="Microsoft";
                    
                }else if(pdp_os=="OTHER"){
                	changeButtonColor("other");
                    $("#firstTagFlag_").val("other");
                    pdp_os="Other";
                    
                }else{
                	changeButtonColor("all");
                    $("#firstTagFlag_").val("all");
                    pdp_os="";
                }
               
                $("#pdp_os").val(pdp_os);
               
                $("div.pdp_kb_hidden").each(function(){
            		
            		supportPDP(this);
            	});
            }
            
       });
    }
    
    if($("div.pdp-feature-row.pdp-related-products")[0]){
        createResellerLinks();
    }
    
    */
	$("#pc").click(function(event){
		event.preventDefault();
		if(!$(this).hasClass("button-teal")){
			$(this).addClass("button-teal");
			$(this).siblings().removeClass("button-teal");
			changeKB("Microsoft");
		}		
	});
$("#mac").click(function(event){
		
		event.preventDefault();
		if(!$(this).hasClass("button-teal")){
			$(this).addClass("button-teal");
			$(this).siblings().removeClass("button-teal");
			changeKB("Apple");
		}		
		
		
	});

$("#all").click(function(event){
	
	event.preventDefault();
	if(!$(this).hasClass("button-teal")){
		$(this).addClass("button-teal");
		$(this).siblings().removeClass("button-teal");
		changeKB("All");
	}		
	

});

$("#other").click(function(event){
	
	event.preventDefault();
	if(!$(this).hasClass("button-teal")){
		$(this).addClass("button-teal");
		$(this).siblings().removeClass("button-teal");
		changeKB("Other");
	}		
	

});

$(".collapse-toggle").click(function (event) {
	event.preventDefault();
});
if($("div.support-kb-items.support-pdp")[0]){
	var buttonList = new Array();
	$(".showPcClass").each(function(event){
		var value = $(this).attr("value");
		if(value=="true"){
			$("#pc").show();
			buttonList.push($("#pc"));
		}
	});
	$(".showMacClass").each(function(event){
		var value = $(this).attr("value");
		if(value=="true"){
			$("#mac").show();
			buttonList.push($("#mac"));
		}
	});
	$(".showOtherClass").each(function(event){
		var value = $(this).attr("value");
		if(value=="true"){
			$("#other").show();
			buttonList.push($("#other"));
		}
	});
	$(".showAllClass").each(function(event){
		var value = $(this).attr("value");
		if(value=="true"){
			$("#all").show();
			buttonList.push($("#all"));
		}
	});
	if(buttonList.length!=0){
		if(buttonList.length == 1){
			buttonList[0].addClass("buttonBorder");
		}else {
			if(buttonList[0].attr("id") == buttonList[buttonList.length-1].attr("id")){
				buttonList[0].addClass("buttonBorder");
			}else{
				buttonList[0].addClass("buttonBorderFirst");
				buttonList[buttonList.length-1].addClass("buttonBorderLast");
			}
		}
	}
}
});
var youtubePrefix="//www.youtube.com/embed/";
var youtubeParameters="?modestbranding=1&rel=0&autohide=1";

function changeKB(os){
	var maxLength=4;
	$("div.pageId").each(function(){
		var text = $.trim($(this).text());
		var kbJSON = "kbJSON"+text;
	    var parentDiv = $("div.support-kb-items.support-pdp."+text).empty();
	    var domString ="";
		var jsonResults =kbjsons[kbJSON].results;
		  $.each(jsonResults, function(i,items){
		     var jsonOs= items;
		     var osValue = jsonOs.os;
		     if(os==osValue){
		         var jsonTopics = jsonOs.topic;
		 	    $.each(jsonTopics, function(i, items){
		 	       var topic = items;
		 	       var topicLabel = topic.label;
		 	      domString+= "<h2>"+topicLabel+"</h2>";		 	     
		 	       var jsonSubTopics = topic.subtopic;	  
		 	      domString +="<ul class=\"support-pdp-list unstyled\">";
		 	      $.each(jsonSubTopics, function(i, items){
		 	        var subtopic = items;
		 	        var subtopicLabel = subtopic.label;
		 	        var links = subtopic.links;
		 	        var viewMoreRandomLink = parseInt(999999*Math.random());
		 	        var linkSize = links.length;
		 	        
		 	        var hasViewMore= false;
		 	        $.each(links, function(i, items){
		 	            var link = items;
		 	            var url = link.url;	
		 	            var title = link.title;		 	          
		                var viewmore_label=link.viewmore_label;
		                var featured = link.featured;
		                var video = link.video;
		                var videoId=link.video_ID;
		                var video_expend= link.video_expanded;
		                var videoRandom =  parseInt(999999*Math.random());
		                if(i>(maxLength-1)){
		                	if(!hasViewMore){
		                		hasViewMore= true;
		                		domString+="<li>";
		                	}
		                	if(i==maxLength){
		                		domString+="<i class=\"ss-navigateright\"></i>";
		                		domString+="<div class=\"support-pdp-list-item clearfix\">";
		                		domString+="<a href=\"#\" class=\"collapse-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#"+viewMoreRandomLink+"\">"+viewmore_label+"</a>";
		                		domString+="</div>";
		                		domString+="<div class=\"collapse-content collapse\" id=\""+viewMoreRandomLink+"\">";
		                		domString+="<div class=\"collapse-inner\">";
		                		domString+="<ul class=\"support-pdp-list unstyled\">";

		                	}
		                	if(video=="1"){
		                		  domString +="<li>";
		                		  domString +="<i class=\"ss-video\"></i>";
		                		  domString +=" <div class=\"support-pdp-list-item clearfix\">";
		                		  if(video_expend=="1"){
		                			  domString+="<a href=\"#\" class=\"collapse-toggle\" data-toggle=\"collapse\" data-target=\"#"+videoRandom+"\">"+title+"</a>";
		                		  }else{
		                			  domString+="<a href=\"#\" class=\"collapse-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#"+videoRandom+"\">"+title+"</a>";
		                		  }
		                		  if(featured=="1"){
					 	        	  domString +="<span class=\"label\">Featured</span>";
					 	          }
		                		  domString+="</div>";
		                		  if(video_expend=="1"){
		                			  domString+="<div class=\"collapse-content in collapse\" id=\""+videoRandom+"\" >";		                			  
		                		  }else{
		                			  domString+="<div class=\"collapse-content collapse\" id=\""+videoRandom+"\" style=\"height: 0px;\">";
		                		  }
		                		  
                                domString+="<div class=\"collapse-inner\">";
                                domString+="<div class=\"video\">";
                                domString+="<div class=\"video-wrapper\">";
                                
                                domString+="<iframe type=\"text/html\" width=\"640\" height=\"360\" src=\""+youtubePrefix+videoId+youtubeParameters+"\" frameborder=\"0\" allowfullscreen=\"\"></iframe>";
                                domString+="</div>";
                                domString+="</div>";
                                domString+="</div>";
                                domString+="</div>";
                                domString+="</li>";
		                	  }else if(url.lastIndexOf(".pdf")!=-1){
		                		  
		                		  domString += "<li>";
		                		  domString +="<i class=\"ss-file\"></i>";
					 	          domString += "<div class=\"support-pdp-list-item clearfix\">";
					 	          domString += "<a href=\""+url+"\">"+title+"</a> ";
					 	          if(featured=="1"){
					 	        	  domString +="<span class=\"label\">Featured</span>";
					 	          }
					 	          domString += " </div>";
					 	          domString += "</li>";
		                	  }else{
		                		  domString += "<li>";
					 	          domString += "<div class=\"support-pdp-list-item clearfix\">";
					 	          domString += "<a href=\""+url+"\">"+title+"</a> ";
					 	         if(featured=="1"){
					 	        	  domString +="<span class=\"label\">Featured</span>";
					 	          }
					 	          domString += " </div>";
					 	          domString += "</li>";
		                	  }
		                	
		                }else{
		                	  if(video=="1"){
		                		  domString +="<li>";
		                		  domString +="<i class=\"ss-video\"></i>";
		                		  domString +=" <div class=\"support-pdp-list-item clearfix\">";
		                		  if(video_expend=="1"){
		                			  domString+="<a href=\"#\" class=\"collapse-toggle\" data-toggle=\"collapse\" data-target=\"#"+videoRandom+"\">"+title+"</a>";
		                		  }else{
		                			  domString+="<a href=\"#\" class=\"collapse-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#"+videoRandom+"\">"+title+"</a>";
		                		  }
		                		  if(featured=="1"){
					 	        	  domString +="<span class=\"label\">Featured</span>";
					 	          }
		                		  domString+="</div>";
		                		  if(video_expend=="1"){
		                			  domString+="<div class=\"collapse-content in collapse\" id=\""+videoRandom+"\" >";		                			  
		                		  }else{
		                			  domString+="<div class=\"collapse-content collapse\" id=\""+videoRandom+"\" style=\"height: 0px;\">";
		                		  }
		                		  
                                  domString+="<div class=\"collapse-inner\">";
                                  domString+="<div class=\"video\">";
                                  domString+="<div class=\"video-wrapper\">";
                                  domString+="<iframe type=\"text/html\" width=\"640\" height=\"360\" src=\""+youtubePrefix+videoId+youtubeParameters+"\" frameborder=\"0\" allowfullscreen=\"\"></iframe>";
                                  domString+="</div>";
                                  domString+="</div>";
                                  domString+="</div>";
                                  domString+="</div>";
                                  domString+="</li>";
		                	  }else if(url.lastIndexOf(".pdf")!=-1){
		                		  
		                		  domString += "<li>";
		                		  domString +="<i class=\"ss-file\"></i>";
					 	          domString += "<div class=\"support-pdp-list-item clearfix\">";
					 	          domString += "<a href=\""+url+"\">"+title+"</a> ";
					 	          if(featured=="1"){
					 	        	  domString +="<span class=\"label\">Featured</span>";
					 	          }
					 	          domString += " </div>";
					 	          domString += "</li>";
		                	  }else{
		                		  domString += "<li>";
					 	          domString += "<div class=\"support-pdp-list-item clearfix\">";
					 	          domString += "<a href=\""+url+"\">"+title+"</a> ";
					 	         if(featured=="1"){
					 	        	  domString +="<span class=\"label\">Featured</span>";
					 	          }
					 	          domString += " </div>";
					 	          domString += "</li>";
		                	  }
		                	 
		                }
		 	         
		 	        });	
		 	       if(hasViewMore){
               		domString +="</ul>";
               		domString +="</div>";
               		domString +="</div>";
               		domString +="</li>";               		
               	}
		 	      });
		 	         domString += "</ul>";
		 	    });		    	 
		     }		     
		});
		  parentDiv.append(domString);
	});
	$(".collapse-toggle").click(function (e) {
	    e.preventDefault();
	});
	
}
function changeButtonColor(currentOS){
	if(currentOS== undefined){
		$(".button.support.pdp.kb.tag").each(function(event){
	    	  	var currentTagVal=$(this).val();
	            if((currentTagVal.toUpperCase()==firstTagFlag.toUpperCase()) && (currentTagVal.toUpperCase()=="ALL")){
	                $(this).addClass("button-teal");
	            }else{
	                $(this).removeClass("button-teal");
	            }
	    });
	}else{
		$(".button.support.pdp.kb.tag").each(function(event){
	        if($(this).val().toUpperCase() == currentOS.toUpperCase()){
	            $(this).addClass("button-teal");
	        }else{
	            $(this).removeClass("button-teal");
	        }  
		});
	}
	
}


function initalKBTag(pageId){
	

	if($("#firstTagFlag_").val()!="all"){
		$("#firstTagFlag_").val($("#firstTagFlag"+pageId+"").val());
		firstTagFlag = $("#firstTagFlag_").val();
	}
	if($("#showPcFlag_").val()=="false"){
		$("#showPcFlag_").val($("#showPcFlag"+pageId+"").val());
		 showPcFlag = $("#showPcFlag_").val();
	}
	if($("#showMacFlag_").val()=="false"){
		$("#showMacFlag_").val($("#showMacFlag"+pageId+"").val());
		showMacFlag=$("#showMacFlag_").val();
	}
	if($("#showOtherFlag_").val()=="false"){
		$("#showOtherFlag_").val($("#showOtherFlag"+pageId+"").val());
		showOtherFlag=$("#showOtherFlag_").val();
	}
	if($("#showAllFlag_").val()=="false"){
		$("#showAllFlag_").val($("#showAllFlag"+pageId+"").val());
		showAllFlag=$("#showAllFlag_").val();
	}
	
   
    if(showPcFlag=="true"){
        $("#pc").show();
    }
    if(showMacFlag=="true"){
        $("#mac").show();
    }
    if(showOtherFlag=="true"){
        $("#other").show();
    }
    if(showAllFlag=="true"){
        $("#all").show();
    }
    if(loadingTimes==countOfKBDiv){
    	changeButtonColor();
    }
    
}



$.extend({
      getUrlVars: function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.lastIndexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
          hash = hashes[i].split('=');
          vars.push(hash[0]);
          vars[hash[0]] = hash[1];
        }
        return vars;
      },
      getUrlVar: function(name){
        var value = $.getUrlVars()[name];
        if(value==undefined){
            value="";
        }
        return value;
      }
}); 

$(document).ready(function(){
    if($("#pdhtitle")[0]){
        var allVars = $.getUrlVars();
        var q=$.getUrlVar("q");
        if(q!=""){
            $.ajax(
                {
                    type:"post",
                    url:"/ww/jsp/support/productDetails/pdhtitleajax.jsp",
                    cache:false,
                    timeout:30000,
                    data:{
                    "searchURLPrefix":pdh_data.searchURLPrefix,
                    "site":pdh_data.site,
                    "locale":pdh_data.locale,
                    "start":pdh_data.start,
                    "num":pdh_data.num,
                    "client":pdh_data.client,
                    "ie":pdh_data.ie,
                    "oe":pdh_data.oe,
                    "tlen":pdh_data.tlen,
                    "getfields":pdh_data.getfields,
                    "lr":pdh_data.lr,
                    "filter":pdh_data.filter,
                    "sort":pdh_data.sort,
                    "requiredfields":pdh_data.requiredfields,
                    "output":pdh_data.output,
                    "q":q               
                    },
                    beforeSend:function(){
                        
                    },
                    success:function(msg){
                            $("#pdhtitle").html(msg);
                            var pdh_type=$("#pdh_type").text();
                           
                            /*if(pdh_type=="2"){
                                var pdh_title=$("#pdh_title").html();
                                $("#pdhtitle").html(pdh_title);
                                $('html head').find('title').html(pdh_title);
                            }else if(pdh_type=="1"){
                                var pdh_title=$("#pdh_title").html();
                                $("#pdhtitle").html(pdh_title);
                            }else if(pdh_type=="0"){
                                var pdh_title=$("#pdh_title").html();
                                $("#pdhtitle").html(pdh_title);
								
                            }*/
							var pdh_title=$("#pdh_title").html();
                            $("#pdhtitle").html(pdh_title);
                            $('html head').find('title').html(pdh_title);
                            
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        $("#pdhtitle").html("<!--"+errorThrown+"-->");
                        
                    }
                    
                    
                }
            );
        }
    }
	
	if($("#support-search-textbox")[0]){
        	$("#support-search-textbox").autocomplete({
        		source: "//"+ serverHost +"/ww/autoSuggest?site=" + gsaSite + "&host=" + gsaURL + "&rcLocaleJS=" + rcLocaleJS,
        		select: function( event, item ) {
        			$("#support-search-textbox").val(item.item.value);
        			submitSearch_supportSearchBox();
        		},
        	});
        }
});

function submitSearch_supportSearchBox(defaultStr){
	if (document.getElementById("support-search-textbox").value.length > 1 &&
	         (document.getElementById("support-search-textbox").value != defaultStr)) {
					var n=rcLocaleJS.split("-");
					var localeURL = "/"+n[1]+"/"+n[0];
	
					if (rcLocaleJS == "en-us") {
		   				localeURL = "";
		   			}
		   			window.location.href = "//"+ serverHost + localeURL +"/search/?tab=nav-tabs-sp&keyword="+document.getElementById("support-search-textbox").value;
		   			return false;
	}else{
	     return false;
	}
}

function checkDefaultText(value) {
    if(value == defaultStr) {
        $("#support-search-textbox").val("");
        return;
    }
    
    if(value == "" || value == null) {
    	$("#support-search-textbox").val(defaultStr);
    	return;
    }
}

function collapseArrow(){

//Prevent page from going to the top when clicking on anchor tag collapse toggle
    $(".collapse-toggle").click(function (e) {
        e.preventDefault();
    }); 
    
    //For the "see more" lists change the direction of the arrow icon to face down when they are open
    if ($('.collapse-toggle[data-toggle="collapse"]').length > 0) {
        var togglers = $('.collapse-toggle[data-toggle="collapse"]');
        togglers.each(function() {
            var collapseToggle = $(this);
            var collapseIcon = $(this).parent().siblings('i');
            var collapseData = $(collapseToggle.data('target'));
            var collapseDataSub = $(collapseData).find('.collapse-content');
            if (collapseIcon.hasClass('ss-navigateright') || collapseIcon.hasClass('ss-navigatedown')) {
                collapseData.on('hide', function() {
                    collapseIcon.attr('class','ss-navigateright');
                }).on('show', function() {      
                    collapseIcon.attr('class','ss-navigatedown');
                });
                collapseDataSub.on('show, hide', function(e) {              
                    e.stopPropagation();
                });
            }
        });
    }

}


function createResellerLinks() {
    var RGID = getRGID(rcLocaleJS, 'embed');
   
    $('.ciModelNumber').each(function(index) { 
        var sku = $(this).text();
        $.getScript("http://seagate.links.channelintelligence.com/scripts/cii_CBL_DataService.asp?sSKU=" + sku + "&nRGID=" + RGID, function() { 
            var ciButtonScript = "cii_ShowCBLButton('" + sku + "', oCIIPrimaryLink, oCIIAlternateLink, " + index + ", '" + RGID + "', CI_LinkID);";
            var ciButtonScriptOutput = eval(ciButtonScript);
            // If button is returned, build our own HTML for it

            if (ciButtonScriptOutput.length > 0) {
                var ciButtonHTML = "";
                for (var i = 0; i < 3; i++) {
                    if (i === 2) {
                        ciButtonScriptOutput[i] = ciButtonScriptOutput[i].replace('>',' class="button button-orange button-s">');
                    }
                    ciButtonHTML += ciButtonScriptOutput[i];
                }
                ciButtonHTML += labels.buy_now +"</a>";
                
                $('.ciModelNumber:contains('+sku+')').parents('.pdp-related-products-price').html(ciButtonHTML);        
            }
        });
    });
}

function getRGID(locale, type) {
/*
 * This function returns the RGID (Channel Intelligence code) for the
 * locale that is passed. Assumes locale is in "en-us" format. It
 * requires the ciLocaleMap global variable (which stores the codes) to
 * exist. If no locale is passed it returns null.
 */
if(!locale) {
    return null;
} else {
    for (var i = 0; i < ciLocaleMap.locales.length; i++) {
        if(typeof (ciLocaleMap.locales[i]) != 'undefined'  && ciLocaleMap.locales[i].name.indexOf(locale) != -1){
             if(type.indexOf('xml')!= -1){
                return ciLocaleMap.locales[i].xml;  
            }else if (type.indexOf('embed')!= -1){  
                    return ciLocaleMap.locales[i].embed;    
                 }else{
                    return null;
                 }  
            }
        }
    }
}

//support pdp search functionality
function submitSupportPDPSearchFormPromo() {
    var searchMsg = document.getElementById('searchMSG').value;
    var qv = document.getElementById("suggestion_form_support_pdp").q.value;
    var prodName= document.getElementById("suggestion_form_support_pdp").productName.value;
   
    if (!qv || !($.trim(qv)) || qv == searchMsg || qv == '') 
    {   
        return false;
    }else{
        var n = rcLocaleJS.split("-");
        var localeURL = "/"+n[1]+"/"+n[0];

        if (rcLocaleJS == "en-us") {
           localeURL = "";
        }
        var qvWithProdName = prodName + " " + qv
        window.location.href = "//"+ serverHost + localeURL + "/search/?keyword=" + qvWithProdName + "&tab=nav-tabs-kb&start=0&r=&kbfilter=&sugg=&s=1";
        return false;
    }
}

function doubleEncoding(source){
            var target=source;
            target=encodeURI(target);
            target=encodeURI(target);
            target=target.replace(/\!/g,"%2521");
            target=target.replace(/\#/g,"%2523");
            target=target.replace(/\\$/g,"%2524");
            target=target.replace(/\&/g,"%2526");
            target=target.replace(/\'/g,"%2527");
            target=target.replace(/\(/g,"%2528");
            target=target.replace(/\)/g,"%2529");
            target=target.replace(/\*/g,"%252B");
            target=target.replace(/\+/g,"%252B");
            target=target.replace(/\,/g,"%252C");
            target=target.replace(/\-/g,"%252D");
            target=target.replace(/\./g,"%252E");
            target=target.replace(/\//g,"%252F");
            target=target.replace(/\:/g,"%253A");
            target=target.replace(/\;/g,"%253B");
            target=target.replace(/\=/g,"%253D");
            target=target.replace(/\?/g,"%253F");
            target=target.replace(/\@/g,"%2540");
            target=target.replace(/\_/g,"%255F");
            target=target.replace(/\~/g,"%257E");
            return target;
}