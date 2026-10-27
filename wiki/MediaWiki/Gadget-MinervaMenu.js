/* Gadget MinervaMenu: thêm hai nhóm liên kết vào menu trượt của Minerva (Minerva không đọc các
   chuyên mục tự thêm trong MediaWiki:Sidebar). Biểu tượng của từng mục ở MediaWiki:Minerva.css
   (.minerva-icon-portletlink-<id>). Giữ danh sách này khớp với MediaWiki:Sidebar. */
mw.loader.using( 'mediawiki.util' ).then( function () {
	var after = document.getElementById( 'p-interaction' );
	if ( !after ) {
		return;
	}
	var GROUPS = [
		[ 'p-hsck', [
			[ 'Thể loại:Nhân vật', 'Nhân vật', 'n-nhanvat' ],
			[ 'Thể loại:Tập truyện', 'Tập truyện', 'n-taptruyen' ],
			[ 'Thể loại:Địa điểm', 'Địa điểm', 'n-diadiem' ]
		] ],
		[ 'p-congdong', [
			[ 'Project:Viết bài đầu tiên', 'Viết bài đầu tiên', 'n-vietbai' ],
			[ 'Project:Ban cán sự', 'Ban cán sự', 'n-bancansu' ],
			[ 'https://go.lophocmatngu.wiki/discord', 'Discord', 'n-discord' ]
		] ]
	];
	GROUPS.forEach( function ( group ) {
		// Nhóm mới chép class của nhóm có sẵn để Minerva vẽ giống hệt (khoảng cách, đường kẻ)
		var ul = document.createElement( 'ul' );
		ul.id = group[ 0 ];
		ul.className = after.className;
		after.after( ul );
		after = ul;
		group[ 1 ].forEach( function ( item ) {
			var href = /^https?:/.test( item[ 0 ] ) ? item[ 0 ] : mw.util.getUrl( item[ 0 ] );
			mw.util.addPortletLink( group[ 0 ], href, item[ 1 ], item[ 2 ] );
		} );
	} );
} );
