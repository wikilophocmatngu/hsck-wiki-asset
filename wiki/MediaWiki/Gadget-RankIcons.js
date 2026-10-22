/* Gadget RankIcons: thay nhãn nhóm quyền của UserProfileV2 (.profile-user-group) bằng nội dung
   trang MediaWiki:RankIcon-<nhóm>, ví dụ MediaWiki:RankIcon-sysop. Nhóm chưa có trang thì giữ nguyên chữ.
   Theo https://dev.miraheze.org/wiki/User:Splatched/RankIcons.js (Splatched), sửa thêm:
   - tắt báo cáo giới hạn của parser và bỏ thẻ <p> bao ngoài, để nhãn không có lề thừa;
   - giữ tên nhóm làm chú thích (title), để vẫn đọc được khi trang chỉ có biểu tượng. */
mw.loader.using( 'mediawiki.api' ).then( function () {
	var api = new mw.Api();
	document.querySelectorAll( '.profile-user-group[data-group]' ).forEach( function ( el ) {
		api.get( {
			action: 'parse',
			page: 'MediaWiki:RankIcon-' + el.dataset.group,
			prop: 'text',
			disablelimitreport: true,
			formatversion: 2
		} ).then( function ( data ) {
			var tmp = document.createElement( 'div' );
			tmp.innerHTML = data.parse.text;
			var block = tmp.querySelector( '.mw-parser-output > p' ) || tmp.firstElementChild || tmp;
			var html = block.innerHTML.trim();
			if ( html ) {
				el.title = el.textContent;
				el.innerHTML = html;
			}
		} ).catch( function () {
			// Trang không tồn tại: giữ nguyên chữ
		} );
	} );
} );
