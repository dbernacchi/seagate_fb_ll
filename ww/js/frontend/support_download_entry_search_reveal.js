/**
 * @author: Eugene Balaban <balaban.eugene@gmail.com>
 * @date: 07.02.11
 * @time: 12:10
 **/

$(document).ready(function() {
//init tabs
	//initTabs('#main', '.tabset li', '.tabBox .tabEl');

    $('#driveParam').change(function(event) {
	checkDriveParam();
    });
    checkDriveParam();
});
$(document).ready(function() {
//init tabs
	//initTabs('#main', '.tabFilter li', '.tabBox .tab');

    $('#driveParam').change(function(event) {
	checkDriveParam();
    });
    checkDriveParam();
});
function checkDriveParam()
{
  if ($('#driveParam').val().length > 0)
  {
	$('#cuselFrame-drive').removeClass('classDisCusel');
	$('#cuselFrame-driveModel').removeClass('classDisCusel');
  }
  else
  {
	$('#cuselFrame-drive').addClass('classDisCusel');
	$('#cuselFrame-driveModel').addClass('classDisCusel');
  }
}
