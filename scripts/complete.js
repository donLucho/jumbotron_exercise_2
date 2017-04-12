var DRYOBJ = ( function ( ) {
	
	/*################  ES5 pragma  ######################*/
	'use strict';	

	// The Browser Prefixes
	var _arVendorPREs = [ "moz", "ms", "webkit", "o" ];

	// ######################
	// ##   Window object
	// ######################
	var _window = window; // GLOBAL element

	// ############################
	// ## 
	// ## function _RetEVTsrcEL_evtTarget(leEvt){}
	// ## 
	// ## // IE and w3c MODELS 
	// ## Motivated by each Robert Nyman and "Doc Crock". Hip-hip!
	// ############################
	function _RetEVTsrcEL_evtTarget( leEvt ) { 
		if( typeof leEvt !== "undefined") { 
			var _EREF = leEvt; 		// w3c
		}
		else {
			var _EREF = window.event; // IE8--
		}
		if( typeof _EREF.target !== "undefined") {
			var evtTrgt = _EREF.target;	// w3c 
			//			console.log( "_EREF.target..." + _EREF.target);  // Temporarily SHUT-OFF, dL, 2013_0608 1720H
		}
		else {
			var evtTrgt = _EREF.srcElement; // IE8--
			//			console.log( "_EREF.srcElement..." + _EREF.srcElement ); // Temporarily SHUT-OFF, dL, 2013_0608 1720H
		}
		return evtTrgt;
	}
	// IMPLEMENTATION FOR TESTING PURPOSES
	// var evtTrgt = DRYOBJ.Utils.evt_u.RetEVTsrcEL_evtTarget( leEvt ); console.log(evtTrgt);
	
		// ############################
	// ## 
	// ##     AddEventoHandler Facade Pattern Function
	// ##     function _AddEventoHandler(nodeFlanders, type, callback) {}
	// ##     
	// ##     
	// ##     Previously designed to minimize anticipated 
	// ##     disconnect between each the W3C/Netscape
	// ##     and IE8 browser implementation models
	// ##     
	// ##     Motivated by each Douglas "Release The 'Crock'" Crockford, John Resig, 
	// ##     Dean Edwards, and Sunday evenings on FOX from many, many, many years ago-- ¡Grax a todos! (Thank you all)
	// ##     
	// ##     As of January 2017, this is no longer necessary and is an item in progress
	// ##     in terms of weaning away from PRESENTLY unsupported versions of IE. :)
	// ##     
	// ##     
	// ############################
	function _AddEventoHandler( nodeFlanders, type, callback ) {
		if( type !== "DOMContentLoaded") { 
			if( nodeFlanders.addEventListener ) { 
				// W3C browser implementation 
				nodeFlanders.addEventListener( type, callback, false);
			}		
			else	
			if( nodeFlanders.attachEvent ) { 
				// IE8-- browser implementation 
				nodeFlanders.attachEvent( "on" + type, callback );
			} 		
			else { 
				// Classical Event model
				nodeFlanders["on" + type] = callback; 
			}
		}
		else 
		if( type === "DOMContentLoaded" ) { 
			if( nodeFlanders.addEventListener ) { 
				// W3C browser implementation 
				nodeFlanders.addEventListener( type, callback, false);
			}
			else 
			if( nodeFlanders.attachEvent ) { 
				if( nodeFlanders.readyState === "loading" ) {
					nodeFlanders.onreadystatechange = callback;
				}
			}
			else { 
				// Classical Event model
				nodeFlanders["on" + type] = callback; 
			}
		}
	}

		// ######################
	// ##   Generic CSS Property Constructor Routine 
	// ##   with pm1( CSSProp ) 
	// ##   and pm2( document.createElement("div").style ) 
	// ######################	
	
	function _ReturnJSProperty( pm1 ) { // ( pm1, pm2 ) 
		var pm2 = document.createElement("div").style; // 
		var ar_vendorPreez = _arVendorPREs; // -->  object
		// [ "moz", "ms", "webkit", "o" ] 
		var clCharMax = ar_vendorPreez.length; // 3 
		var leProp;
		var dL;
		
		var param = pm1; // " transform "
		var paramEl = pm2; // " document.createElement("div").style "
		var len = param.length; 
		var nc = param.slice( 0,1 ); // t
		var Uc = param.slice( 0,1 ).toUpperCase(); // T
		
		var Param = param.replace( nc, Uc ); // transform	
		if ( param in paramEl ) { 
			leProp = param; 
		} 
		for ( dL = 0; dL < clCharMax; dL = dL + 1) { 
			if ( ar_vendorPreez[ dL ] + Param in paramEl ) { 
		// " transform " --> msTransform, webkitTransform, oTransform, mozTransform
				leProp = ar_vendorPreez[ dL ] + Param; 
			} 
		} 
		return leProp;
	}
	
	// ######################
	// ##   Return CSS Property Routine 
	// ##   with pm1( CSSProp ) 
	// ##   and pm2( document.createElement("div").style ) 
	// ######################	
	
	function _ReturnCSSProperty( pm1 ) { // ( pm1, pm2 ) 
		var dashChar = "-";
		var pm2 = document.createElement("div").style;  
		var ar_vendorPreez = _arVendorPREs; // -->  object
		// [ "moz", "ms", "webkit", "o" ] 
		var clCharMax = ar_vendorPreez.length; // 3 
		var leProp;
		var dL;
		
		var param = pm1; // " transform "
		var paramEl = pm2; // " document.createElement("div").style "
		var len = param.length; 
		var nc = param.slice( 0,1 ); // t
		var Uc = param.slice( 0,1 ).toUpperCase(); // T
		
		var Param = param.replace( nc, Uc ); // transform	
		if ( param in paramEl ) { 
			leProp = param; 
		} 
		for ( dL = 0; dL < clCharMax; dL = dL + 1) { 
			if ( ar_vendorPreez[ dL ] + Param in paramEl ) { 
		// " transform " --> -ms-transform, -webkit-transform, -o-transform, -moz-transform
				leProp = dashChar + ar_vendorPreez[ dL ] + dashChar + param; 
			} 
		} 
		return leProp;
	}
	
	// ############################
	// ##   Return CSS Keyframe Animation Routine 
	// ##   with pm1( CSSProp ) 
	// ##   that is later helpful in obtaining 
	// ##   "the ampersand + keyframes" property
	// ############################
	
	function _Returnkeyframes( pm1 ) { // ( pm1 ) 
		var dashChar = "-";
		var ampChar = "@";
		
		var pm2 = document.createElement("div").style; // 
		var ar_vendorPreez = [ "moz", "ms", "webkit", "o" ]; // -->  object
		// [ "moz", "ms", "webkit", "o" ] 
		var clCharMax = ar_vendorPreez.length; // 3 
		
		var keyframes; // var leProp;
		var dL;
		
		var param = pm1; // "animationName" 
		var paramEl = pm2; // " document.createElement("div").style "
		var len = param.length; 
		var nc = param.slice( 0,1 ); // a // t
		var Uc = param.slice( 0,1 ).toUpperCase(); // A // T
		
		var Param = param.replace( nc, Uc ); // animationName 
		if ( param in paramEl ) { 
			// leProp = param; 
			keyframes = ampChar + "keyframes"; 
		} 
		
		for ( dL = 0; dL < clCharMax; dL = dL + 1) { 
			if ( ar_vendorPreez[ dL ] + Param in paramEl ) { 
				// leProp = dashChar + ar_vendorPreez[ dL ] + dashChar + param; 
				
		// " @keyframes " --> @-ms-keyframes, @-webkit-keyframes, @-o-keyframes, @-moz-keyframes
				keyframes = ampChar + dashChar + ar_vendorPreez[ dL ] + dashChar + "keyframes"; //
			} 
		} 
		//return leProp;
		return keyframes;
	}

	// END of _private properties
	return {
		ApplyPrefixes : { 
			ReturnJSProperty : function( pm1 ) {
				return _ReturnJSProperty( pm1 );
			} , 
			ReturnCSSProperty : function( pm1 ) {
				return _ReturnCSSProperty( pm1 );
			} , 
			Returnkeyframes : function( pm1 ) {
				return _Returnkeyframes( pm1 );
			} 
		} , // END DRYOBJ.ApplyPrefixes 
		RetELs: {
			glow : function() { 
				return _window; 
			} 
		},
		Utils: {
			evt_u: {
				AddEventoHandler : function( nodeFlanders, type, callback ) {
					return _AddEventoHandler( nodeFlanders, type, callback );
				} , 
				RetEVTsrcEL_evtTarget : function( leEvt ) {
					return _RetEVTsrcEL_evtTarget( leEvt );
				}
			}
		} 
	}; // END public properties	
}( ) ); // console.log( DRYOBJ ); 


var Gh_pages_ex2 = ( function() {	
	
	/*################  ES5 pragma  ######################*/
	'use strict';

	var _docObj = window.document;
	var _str_href = window.location.href; 
	
	var _leHead = _docObj.getElementsByTagName( "head" )[0];	
	var _loadicon = _docObj.querySelector( "#loadicon" );	
	var js_animation = DRYOBJ.ApplyPrefixes.ReturnJSProperty( "animation" ); // console.log("js_animation", js_animation ); // var css_animation, css_animationName	
	var css_transform = DRYOBJ.ApplyPrefixes.ReturnCSSProperty( "transform" ); // console.log( "css_transform" , css_transform );	
	var keyframes = DRYOBJ.ApplyPrefixes.Returnkeyframes( "animationName" ); // console.log( "keyframes", keyframes );
	
	var _xhr = false, _arGLO_SAILORs = [], _url = "data/sailors_AtSea.xml", _curImg = undefined; _docObj = window.document; 

	function _DOMCONLO() {
		_loadicon.style[ js_animation ] = "spin 1.406s linear infinite";	
		
		var KF_STR = "" +
		keyframes + " spin { "
			+ "from {" 
				+ css_transform + ":rotate( 0deg );" 
				+ " opacity: 0.4; " 
			+" }" 
			+ "50% {" 
				+ css_transform + ":rotate( 180deg );" 
				+ " opacity: 1.0;" 
			+" }" 			
			+ "to {" 
				+ css_transform + ":rotate( 360deg );" 
				+ " opacity: 0.4;" 
			+ " }" 		
		+ "}";
		
		var leFrag = _docObj.createDocumentFragment();
		

		var leStyle = _docObj.createElement( "style" );
		leStyle.type = "text/css";
		leStyle.setAttribute( "media", "all,screen,projection" );
		leStyle.appendChild( _docObj.createTextNode( KF_STR ) ); // console.log( leStyle );
		
		leFrag.appendChild( leStyle );
		_leHead.appendChild( leFrag ); // console.log( _leHead );
	}	
	
	function _LOAD() { 
	
		if (window.XMLHttpRequest) { _xhr = new XMLHttpRequest(); }
		// else
		// if (window.ActiveXObject) { _xhr = new ActiveXObject("Microsoft.XMLHTTP"); } 
		
		if ( !! _xhr) {
			_xhr.onreadystatechange = BuildDataArrayFromXml;
			_xhr.open("GET", _url, true);
			_xhr.send(null); 
			
			// _docObj.getElementById( "imgText" ).innerHTML = "LOADICON...";
			_docObj.getElementById( "imgText" ).innerHTML = "";
			_docObj.querySelector( "#loadicon" ).style.display = "inline-block";
			
			if( _docObj.documentElement.addEventListener ) {_xhr.onload = NeutralizeXHR; }
		} // END if ( !!_xhr )
		else
		if (!_xhr) { alert("Sorry, bub -- An XHR could not be requested."); } 
		
	} // END _LOAD()
	
	function NeutralizeXHR()  { // console.log( "_xhr", _xhr );
		_xhr = null; //console.log( "_xhr", _xhr );
	} // END NeutralizeXHR()
	
	function klkFun( leEvt ) { 
		
		_docObj.getElementById( "logText" ).innerHTML = ""; 
		
		var evtTrgt = DRYOBJ.Utils.evt_u.RetEVTsrcEL_evtTarget( leEvt );
		var CREWMEMBER = _arGLO_SAILORs[ evtTrgt.id ];
		var imgCt = _arGLO_SAILORs.length; 
		
		var xBlog, xEpithet, xOccupation, xShip, xBounty, xJollyRoger; 
		
		var xFirst,xLast,xDebut,xCrew,xOrdinal;
		
		var h1Frag = _docObj.createDocumentFragment(); 
		var h1EL = _docObj.createElement( "h1" );
		
		xBlog = _arGLO_SAILORs[ evtTrgt.id ].BLOG;
		xEpithet = _arGLO_SAILORs[ evtTrgt.id ].EPITHET;
		xOccupation = _arGLO_SAILORs[ evtTrgt.id ].OCCUPATION;
		xShip = _arGLO_SAILORs[ evtTrgt.id ].SHIP;
		xBounty = _arGLO_SAILORs[ evtTrgt.id ].BOUNTY;
		xJollyRoger = _arGLO_SAILORs[ evtTrgt.id ].URL; 
		
		xFirst = _arGLO_SAILORs[ evtTrgt.id ].FIRSTNAME;
		xLast = _arGLO_SAILORs[ evtTrgt.id ].LASTNAME;
		xDebut = _arGLO_SAILORs[ evtTrgt.id ].EPDEBUT;
		xCrew = _arGLO_SAILORs[ evtTrgt.id ].CREW;
		xOrdinal = _arGLO_SAILORs[ evtTrgt.id ].CLUBMEMBER;
		
		
		h1EL.appendChild( _docObj.createTextNode( "Reward of " + xBounty + " Beri" ) );
		h1EL.setAttribute( "class", "header" );
		
		h1Frag.appendChild( h1EL );
		
		var pInitFrag = _docObj.createDocumentFragment(); 
		var pInitEL = _docObj.createElement( "p" );
		pInitEL.setAttribute( "class", "code initialism" );
		pInitEL.appendChild( _docObj.createTextNode( "\u00A7 Wanted: Dead or Alive \u00A7 " + xEpithet + " \u00A7" ) );
		pInitFrag.appendChild( pInitEL );
		
		var pLeadFrag = _docObj.createDocumentFragment(); 
		var pLeadEL = _docObj.createElement( "p" );
		pLeadEL.setAttribute( "class", "lead" );
		pLeadEL.appendChild( _docObj.createTextNode( "" + xLast + " is the " + xOrdinal + " member to join the " + xCrew + " " ) );
		pLeadFrag.appendChild( pLeadEL );
		
		var pBlkShpFrag = _docObj.createDocumentFragment(); 
		var pBlkShpEL = _docObj.createElement( "p" );
		
		var anchoTNFrag = _docObj.createDocumentFragment(); 
		var anchoTNEL = _docObj.createElement( "a" );
		// anchoTNEL.setAttribute( "class" , "thumbnail" );
		anchoTNEL.setAttribute( "class" , "img-thumbnail leBlkAncho" );
		anchoTNEL.setAttribute( "target" , "_blank" );
		anchoTNEL.setAttribute( "href" , xBlog );

		var imgJrFrag = _docObj.createDocumentFragment(); 
		var imgJrEL = _docObj.createElement( "img" );
		var altTxt = "Picture of " + xFirst + " " + xLast + "\'s jolly roger";
		imgJrEL.setAttribute( "alt" , altTxt );

		var srcVal = _str_href + "img/jollyRMugiwara/" + xJollyRoger + "";

		imgJrEL.setAttribute( "src" , srcVal );
		imgJrEL.setAttribute( "width" , "48" );
		imgJrEL.setAttribute( "height" , "48" );
		imgJrEL.setAttribute( "class" , "leBlkImg" );
		
		imgJrFrag.appendChild( imgJrEL );
		anchoTNEL.appendChild( imgJrFrag );
		
		var spanFrag = _docObj.createDocumentFragment(); 
		var spanEL = _docObj.createElement( "span" );
		spanEL.setAttribute( "class" , "text-success lead" );
		spanEL.appendChild( _docObj.createTextNode( "Visit " + xCrew + " " + xOccupation + " " + xEpithet + "\'s wikia today" ) ); 
		
		spanFrag.appendChild( spanEL );
		anchoTNEL.appendChild( spanFrag );
		
		anchoTNFrag.appendChild( anchoTNEL );
		pBlkShpEL.appendChild( anchoTNFrag );
		
		pBlkShpFrag.appendChild( pBlkShpEL );
		
		var pTiFrag = _docObj.createDocumentFragment(); 
		var pTiEL = _docObj.createElement( "p" );
		pTiEL.setAttribute( "class", "text-info lead" );
		pTiEL.appendChild( _docObj.createTextNode( "" + xFirst + " " + xLast + " is the ship " + xOccupation + " " ) );
		pTiFrag.appendChild( pTiEL );
		
		_docObj.getElementById( "logText" ).appendChild( h1Frag ); 
		_docObj.getElementById( "logText" ).appendChild( pInitFrag ); 
		_docObj.getElementById( "logText" ).appendChild( pLeadFrag ); 
		_docObj.getElementById( "logText" ).appendChild( pBlkShpFrag ); 
		_docObj.getElementById( "logText" ).appendChild( pTiFrag ); 
	}
	
	function BuildDataArrayFromXml() {
		if ( this.readyState === 4 ) {
			if ( this.status === 200) {
				if ( this.responseXML) {
					var arXHRpushed_SWABBIEs = this.responseXML.getElementsByTagName("CREWMEMBER"), xhrSwabLen = arXHRpushed_SWABBIEs.length;
					
					for (var iter = 0; iter < xhrSwabLen; iter = iter + 1) {
						var tempOBJ = {};
						tempOBJ.BLOG = GetVal(arXHRpushed_SWABBIEs[iter], "BLOG");
						tempOBJ.EPITHET = GetVal(arXHRpushed_SWABBIEs[iter], "EPITHET");
						tempOBJ.OCCUPATION = GetVal(arXHRpushed_SWABBIEs[iter], "OCCUPATION");
						tempOBJ.SHIP = GetVal(arXHRpushed_SWABBIEs[iter], "SHIP");
						tempOBJ.BOUNTY = GetVal(arXHRpushed_SWABBIEs[iter], "BOUNTY");
						tempOBJ.URL = GetVal(arXHRpushed_SWABBIEs[iter], "URL");
						
						tempOBJ.FIRSTNAME = GetVal(arXHRpushed_SWABBIEs[iter], "FIRSTNAME");
						tempOBJ.LASTNAME = GetVal(arXHRpushed_SWABBIEs[iter], "LASTNAME");
						tempOBJ.EPDEBUT = GetVal(arXHRpushed_SWABBIEs[iter], "EPDEBUT");
						tempOBJ.CREW = GetVal(arXHRpushed_SWABBIEs[iter], "CREW");
						tempOBJ.CLUBMEMBER = GetVal(arXHRpushed_SWABBIEs[iter], "CLUBMEMBER");
						
						_arGLO_SAILORs[iter] = tempOBJ; 
					} // END for () 
					
					// AccessRecord(); //console.log("_arGLO_SAILORs" , _arGLO_SAILORs );
					var CREWMEMBER, imgCt = _arGLO_SAILORs.length, xBlog, xEpithet, xOccupation, xShip, xBounty, xJollyRoger;
					
					var xFirst, xLast, xDebut, xCrew, xOrdinal;
					
					_docObj.getElementById( "imgText" ).innerHTML = "";
					_docObj.querySelector( "#loadicon" ).style.display = "none";
					
					for (var a = 0; a < imgCt; a = a + 1 ) {
						
						CREWMEMBER = _arGLO_SAILORs[ a ];
						xBlog = CREWMEMBER.BLOG, xEpithet = CREWMEMBER.EPITHET, xOccupation = CREWMEMBER.OCCUPATION;
						xShip = CREWMEMBER.SHIP, xBounty = CREWMEMBER.BOUNTY, xJollyRoger = CREWMEMBER.URL; 
						
						xFirst = CREWMEMBER.FIRSTNAME;
						xLast = CREWMEMBER.LASTNAME;
						xDebut = CREWMEMBER.EPDEBUT;
						xCrew = CREWMEMBER.CREW;
						xOrdinal = CREWMEMBER.CLUBMEMBER;
						
						var colsm4Frag = _docObj.createDocumentFragment();
						var colsm4EL = _docObj.createElement( "div" );
						
						var h4Frag = _docObj.createDocumentFragment();
						var h4EL = _docObj.createElement( "h4" );
						var h4txt = "" + xFirst + " " + xLast + "";
						h4EL.appendChild( _docObj.createTextNode( h4txt ) );
						h4Frag.appendChild( h4EL );
						
						var pFrag = _docObj.createDocumentFragment();
						var pEL = _docObj.createElement( "p" );
						
						// var ptxt = "" + xEpithet + " debuted in episode " + xDebut + ". " + xFirst + "-- the " + xOrdinal + " to board the " + xShip + "-- " + " is the crew " + xOccupation + "." ;
						
						// var ptxt = "" + xEpithet + " is the " + xOccupation + " aboard the " + xShip + " & debuted in episode " + xDebut + " and is the " + xOrdinal + " to join the crew. ";
						
						var ptxt = "" + xEpithet + " debuted in episode " + xDebut + " and is the " + xOrdinal + " to join the crew ";
						
						pEL.appendChild( _docObj.createTextNode( ptxt ) );
						
						pEL.setAttribute( "class", "klk" );
						pEL.setAttribute( "id", a );
						DRYOBJ.Utils.evt_u.AddEventoHandler( pEL, "click", klkFun );
						
						pFrag.appendChild( pEL );
						
						colsm4EL.setAttribute( "class", "col-sm-4" );
						colsm4EL.appendChild( h4Frag ); 
						colsm4EL.appendChild( pFrag ); 
						colsm4Frag.appendChild( colsm4EL );
						_docObj.getElementById( "imgText" ).appendChild( colsm4Frag );
					}
					
				} // END if ( _xhr.responseXML )
			} // END if( _xhr.status === 200 ) 				
			else {
				alert("Problems, dude: ", this.status);
			} 
		} // END if( _xhr.readyState === 4 )

		function GetVal(pmData, pmTag) {
			return pmData.getElementsByTagName(pmTag)[0].firstChild.nodeValue;
		} // END GetVal(pmData,pmTag) 
		
	} // END BuildDataArrayFromXml()
	// END of _private properties

	return {
		InitDCL: function() {
			return _DOMCONLO(); 
		} , // window.Gh_pages_ex2.InitDCL()
		InitLoad: function() {
			return _LOAD(); 
		} // window.Gh_pages_ex2.InitLoad()
	};
} )(); // window.Gh_pages_ex2

DRYOBJ.Utils.evt_u.AddEventoHandler( window , "DOMContentLoaded" , Gh_pages_ex2.InitDCL() );
DRYOBJ.Utils.evt_u.AddEventoHandler( window, "load" , Gh_pages_ex2.InitLoad() ); 