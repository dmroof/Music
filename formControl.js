	
	//Global Variables
	
	//This stores the total number of songs at a given time.
	var TotalSongs = 5;
	/********************************************************************
	'------------------------------------------------------------
    '-                Subprogram Name: addTrack.click()         -
    '------------------------------------------------------------
    '-                Written By: David Roof                    -
    '-                Written On: 5/11/2016                     -
    '------------------------------------------------------------
    '- Subprogram Purpose:                                      -
    '- 															-
	'- This subroutine is called when the Insert Track button is-
	'- clicked. When this subroutine is called, it checks first -
	'- if the textboxes are empty. If not, then add the new song-
	'-	to the table.											-
    '------------------------------------------------------------
	********************************************************************/
	$("#addTrack").click(function () {
		if (checkInput() == true){
			addTrack();
		}
	});

	/********************************************************************
	'------------------------------------------------------------
    '-                Subprogram Name: ImportJSON               -
    '------------------------------------------------------------
    '-                Written By: David Roof                    -
    '-                Written On: 5/11/2016                     -
    '------------------------------------------------------------
    '- Subprogram Purpose:                                      -
    '- 															-
	'- This subroutine is called when the Import JSON button is -
	'- clicked. When this subroutine is called, the screen 		-
	'- darkens and a popup appears. This subroutine manages the -
	'- popup effect.											-
    '------------------------------------------------------------
	********************************************************************/
	$("#ImportJSON").click(function () {
		$('#popup1').css('visibility', function(i, visibility) {
			return (visibility == 'visible') ? 'hidden' : 'visible';
		});
		
		$('#popup1').css('opacity', function(i, opacity) {
			return (opacity == '1') ? '0' : '1';
		});
	});
	
	/********************************************************************
	'------------------------------------------------------------
    '-                Subprogram Name: addTrack                 -
    '------------------------------------------------------------
    '-                Written By: David Roof                    -
    '-                Written On: 5/11/2016                     -
    '------------------------------------------------------------
    '- Subprogram Purpose:                                      -
    '- 															-
	'- This subroutine is called when the Insert Track button is-
	'- clicked. When this subroutine is called, it add the new  - 
	'- song to the table. Before adding to the table, this		-
	'- subroutine checks if the play count and the track number -
	'- are numbers. If not, then default the play count to 1 and-
	'- default the track number to the total number of songs 	-
	'- plus one. Then add the new row to the table. Then update -
	'- the total number of songs and update the stats. Then 	-
	'- clear the textboxes.
    '------------------------------------------------------------
	********************************************************************/
	function addTrack(){
		var name;
		var trackNum;
		var playCount;
		
		name = $('#NewName').val();
		trackNum = $('#NewTrack').val();
		playCount = $('#NewPlayCount').val();
		if (isNaN(playCount)){
			playCount = 1;
		}
		if (isNaN(trackNum)){
			trackNum = TotalSongs + 1;
		}
			
		var $newRecord = $("<tr> <td>" + name + "</td> <td> "+ trackNum +" </td> <td> "+ playCount +" </td> </tr>");
		$('#datagrid1table').append($newRecord);
		
		$('#NewName').val("");
		trackNum = $('#NewTrack').val("");
		playCount = $('#NewPlayCount').val("");
		TotalSongs++;
		$('#TotalSongs').text("( " + TotalSongs + " )");
		CalStats();
	}
	/********************************************************************
	'------------------------------------------------------------
    '-                Subprogram Name: loadJSON                 -
    '------------------------------------------------------------
    '-                Written By: David Roof                    -
    '-                Written On: 5/11/2016                     -
    '------------------------------------------------------------
    '- Subprogram Purpose:                                      -
    '- 															-
	'- This subroutine is called when the Insert JSON button is	-
	'- clicked. When this subroutine is called, it parses the 	-
	'- JSON data from the textarea into an array. The array is 	-
	'- further processed to recreate the table of songs. Then 	-
	'- update the total number of songs and update the stats.  	-
	'- Then clear the textarea.									-
    '------------------------------------------------------------
	********************************************************************/
	function loadJSON(){
		TotalSongs = 0;
		var RAWJSON = $('#jsonOutput').val();
		var JSONData = JSON.parse(RAWJSON);
		var music = JSONData.music;
		$('#datagrid1table tbody').remove();
		$.each(music, function( index, elem ) {
			var $newRecord = $("<tr> <td>" + elem.name + "</td> <td> "+ elem.trackNum +" </td> <td> "+ elem.playCount +" </td> </tr>");
			TotalSongs++;
			$('#datagrid1table').append($newRecord);
		});
		$('#TotalSongs').text("( " + TotalSongs + " )");
		$('#jsonOutput').val("");
		CalStats();
	}
	
	/********************************************************************
	'------------------------------------------------------------
    '-                Subprogram Name: checkInput                 -
    '------------------------------------------------------------
    '-                Written By: David Roof                    -
    '-                Written On: 5/11/2016                     -
    '------------------------------------------------------------
    '- Subprogram Purpose:                                      -
    '- 															-
	'- This subroutine is called when the Insert Track button is-
	'- clicked. When this subroutine is called, it checks in 	-
	'- anything exists in the textboxes. For textboxes that do	-
	'- not have anything, the class "has-error" is toggled to 	-
	'- notify the user that the textbox requires input. The 	-
	'- subroutine counts the number of textboxes that are empty.-
	'- The count is zero, return true to allow the addition of 	-
	'- the new record. Else return false.
    '------------------------------------------------------------
	********************************************************************/
	function checkInput(){
		var name;
		var trackNum;
		var playCount;
		var n = 0;
		name = $('#NewName').val().trim();
		trackNum = $('#NewTrack').val().trim();
		playCount = $('#NewPlayCount').val().trim();
		
		if (name.length == 0) {
			n++;
			$('#formNewName').addClass('has-error');
		} 
		else{
			$('#formNewName').removeClass('has-error');
		}
		if (trackNum.length == 0) {
			n++;
			$('#formNewTrack').addClass('has-error');
		}
		else{
			$('#formNewTrack').removeClass('has-error');
		}		
		if (playCount.length == 0) {
			n++;
			$('#formNewPlayCount').addClass('has-error');
		} 
		else{
			$('#formNewPlayCount').removeClass('has-error');
		}
		
		if (n > 0){
			return false;
		}
		else{
			return true;
		}	
	}
	
	/********************************************************************
	'------------------------------------------------------------
    '-                Subprogram Name: close_popup.click        -
    '------------------------------------------------------------
    '-                Written By: David Roof                    -
    '-                Written On: 5/11/2016                     -
    '------------------------------------------------------------
    '- Subprogram Purpose:                                      -
    '- 															-
	'- This subroutine is called when the X or the cancel button-
	'- on the popup has been clicked. This subroutine toggles 	-
	'- the visibility and opacity so it can disappear back into -
	'- the background.
    '------------------------------------------------------------
	********************************************************************/
	$('.close_popup, #Cancel').on("click", function () {
		$('#popup1').css('visibility', function(i, visibility) {
			return (visibility == 'visible') ? 'hidden' : 'visible';
		});
		$('#popup1').css('opacity', function(i, opacity) {
			return (opacity == '1') ? '0' : '1';
		});
	});
	
	/********************************************************************
	'------------------------------------------------------------
    '-                Subprogram Name: LoadJSON.click        -
    '------------------------------------------------------------
    '-                Written By: David Roof                    -
    '-                Written On: 5/11/2016                     -
    '------------------------------------------------------------
    '- Subprogram Purpose:                                      -
    '- 															-
	'- This subroutine is called when the load button on the 	-
	'- popup has been clicked. This subroutine toggles the 		-
	'- visibility and opacity so it can disappear back into the -
	'- background. Then the JSON data is loaded.
    '------------------------------------------------------------
	********************************************************************/
	$('#LoadJSON').on("click", function () {
		$('#popup1').css('visibility', function(i, visibility) {
			return (visibility == 'visible') ? 'hidden' : 'visible';
		});
		$('#popup1').css('opacity', function(i, opacity) {
			return (opacity == '1') ? '0' : '1';
		});
		loadJSON();
	});
	
	
	/********************************************************************
	'------------------------------------------------------------
    '-                Subprogram Name: wrapInner.click       	 -
    '------------------------------------------------------------
    '-                Written By: David Roof                    -
    '-                Written On: 5/11/2016                     -
    '------------------------------------------------------------
    '- Subprogram Purpose:                                      -
    '- 															-
	'- This subroutine is called when the head of the columns is-
	'- clicked. Depending on the column position, all contents	-
	'- are sorted based on that column.
    '------------------------------------------------------------
	********************************************************************/
    $('#thName, #thTrack, #thCount')
        .wrapInner('<span title="sort this column"/>')
        .each(function(){
            
            var th = $(this),
                thIndex = th.index(),
                inverse = false;
            
            th.click(function(){
                
                $('#datagrid1table').find('td').filter(function(){
                    
                    return $(this).index() === thIndex;
                    
                }).sortElements(function(a, b){
                    
                    return $.text([a]) > $.text([b]) ?
                        inverse ? -1 : 1
                        : inverse ? 1 : -1;
                    
                }, function(){
                    
                    // parentNode is the element we want to move
                    return this.parentNode; 
                    
                });
                
                inverse = !inverse;
                    
            });
                
        });
	
	/********************************************************************
	'------------------------------------------------------------
    '-                Subprogram Name: CalStats       			-
    '------------------------------------------------------------
    '-                Written By: David Roof                    -
    '-                Written On: 5/11/2016                     -
    '------------------------------------------------------------
    '- Subprogram Purpose:                                      -
    '- 															-
	'- This subroutine is called when the stats need to be 		-
	'- updated. The table songs are stored into an array with 	-
	'- Zipf's score and song name. Then the array is sorted 	-
	'- using a lambda function. Then the stats list is cleared	-
	'- and rebuilt with the top three songs. Then update the 	-
	'- total top songs (in the event there are less than 3 songs).
    '------------------------------------------------------------
	********************************************************************/
	function CalStats(){
	var n = 1;
	var scoreTable = [];	
		$('#datagrid1table').each(function () {
			var x = 0;
			$(this).find('tr').each(function () {

				var name = $(this).find('td:eq(0)').text();
				
				var score = $(this).find('td:eq(2)').text();
					if (isNaN(score)){
						score = 1;
					}
					score = (score / n);
					
					scoreTable.push({
						nameID: name,
						ScoreID: score
					});
					n++
				x++;
			});
		});
		scoreTable.sort(function(a, b) {
			return a.ScoreID < b.ScoreID;
		});
		
		$('#SongList').empty();
		var x = 0;
		var x_lowerbound = 0;
		for(x;x < TotalSongs;x++){
			if (x_lowerbound == 3){}
			else{
				var $newElement = $("<li>" + scoreTable[x].nameID + "</li>")
				$('#SongList').append($newElement);
				x_lowerbound++;
			}
		}
		
		$('#TopTotalSongs').text("( " + x_lowerbound + " )");
	}