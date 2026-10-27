// Trình diễn toàn bộ các phần tử giao diện OOUI (dựa trên https://doc.wikimedia.org/oojs-ui/master/demos).
// Yêu cầu thẻ <div id="ooui-test"></div> trên trang.

Promise.all([
	mw.loader.using([
		'oojs-ui-core',
		'oojs-ui-widgets',
		'oojs-ui-toolbars',
		'oojs-ui-windows',
		'oojs-ui.styles.icons-location',
		'oojs-ui.styles.icons-movement',
		'oojs-ui.styles.icons-content',
		'oojs-ui.styles.icons-alerts',
		'oojs-ui.styles.icons-interactions',
		'oojs-ui.styles.icons-moderation',
		'oojs-ui.styles.icons-editing-core',
		'oojs-ui.styles.icons-editing-styling',
		'oojs-ui.styles.icons-editing-list',
		'oojs-ui.styles.icons-editing-advanced',
		'oojs-ui.styles.icons-editing-citation',
		'oojs-ui.styles.icons-media',
		'oojs-ui.styles.icons-user',
		'oojs-ui.styles.icons-layout',
		'oojs-ui.styles.icons-accessibility',
		'oojs-ui.styles.icons-wikimedia',
	]),
	$(() => Promise.resolve())
]).then(() => {
	if (!document.getElementById('hs-ooui-demo-css')) {
		$('<style id="hs-ooui-demo-css">').text(`
			.hs-ooui-demo {
				display: flex;
				flex-direction: column;
				gap: 1.5rem;
				margin-top: 0.75rem;
			}
			.hs-ooui-toolbar {
				position: sticky;
				top: 0.5rem;
				z-index: 20;
				display: flex;
				flex-wrap: wrap;
				gap: 0.65rem;
				align-items: center;
				justify-content: space-between;
				padding: 0.65rem 0.85rem;
				background: var(--hs-paper, #fbf8f1);
				border: 1px solid var(--hs-rule, #d8d0c0);
				border-radius: 8px;
				box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
			}
			.hs-ooui-nav {
				display: flex;
				flex-wrap: wrap;
				gap: 0.35rem;
			}
			.hs-ooui-nav-btn {
				appearance: none;
				border: 1px solid var(--hs-rule, #ccc);
				background: var(--hs-tone, rgba(0, 0, 0, 0.03));
				color: var(--hs-ink, inherit);
				font: 600 0.82rem/1.3 var(--hs-font-sans, sans-serif);
				padding: 0.38rem 0.7rem;
				border-radius: 6px;
				cursor: pointer;
				transition: background 0.15s, border-color 0.15s, color 0.15s;
			}
			.hs-ooui-nav-btn:hover {
				border-color: var(--hs-blue, #36c);
			}
			.hs-ooui-nav-btn.is-active {
				background: var(--hs-blue, #1f4e99);
				border-color: var(--hs-blue, #1f4e99);
				color: #fff;
			}
			.hs-ooui-search {
				flex: 1 1 220px;
				max-width: 320px;
			}
			.hs-ooui-search.oo-ui-textInputWidget {
				max-width: none;
			}
			.hs-ooui-section {
				display: flex;
				flex-direction: column;
				gap: 0.75rem;
			}
			.hs-ooui-section[hidden] {
				display: none !important;
			}
			.hs-ooui-section-head {
				display: flex;
				align-items: baseline;
				justify-content: space-between;
				gap: 0.5rem;
				margin: 0;
				padding-bottom: 0.35rem;
				border-bottom: 2px solid var(--hs-rule, #d8d0c0);
				font-family: var(--hs-font-display, sans-serif);
				font-size: 1.2rem;
				color: var(--hs-ink, inherit);
			}
			.hs-ooui-section-count {
				font: 600 0.78rem/1 var(--hs-font-sans, sans-serif);
				color: var(--hs-muted, #666);
			}
			.hs-ooui-grid {
				display: grid;
				grid-template-columns: repeat(auto-fill, minmax(min(100%, 270px), 1fr));
				gap: 0.65rem;
				align-items: start;
			}
			.hs-ooui-grid--wide {
				grid-template-columns: repeat(auto-fill, minmax(min(100%, 420px), 1fr));
			}
			.hs-ooui-grid--icons {
				grid-template-columns: repeat(auto-fill, minmax(min(100%, 155px), 1fr));
				gap: 0.45rem;
			}
			.hs-ooui-card {
				display: flex;
				flex-direction: column;
				gap: 0.45rem;
				padding: 0.65rem 0.75rem;
				border: 1px solid var(--hs-rule, #d8d0c0);
				border-radius: 6px;
				background: var(--hs-tone, rgba(127, 127, 127, 0.03));
				min-width: 0;
			}
			.hs-ooui-card[hidden] {
				display: none !important;
			}
			.hs-ooui-card--span {
				grid-column: 1 / -1;
			}
			.hs-ooui-card-meta {
				display: flex;
				align-items: center;
				justify-content: space-between;
				gap: 0.4rem;
				font: 600 0.72rem/1.2 ui-monospace, SFMono-Regular, Consolas, monospace;
				color: var(--hs-muted, #666);
				border-bottom: 1px dashed var(--hs-rule, rgba(127, 127, 127, 0.25));
				padding-bottom: 0.28rem;
				word-break: break-word;
			}
			.hs-ooui-card-Flags {
				font-weight: 400;
				opacity: 0.85;
			}
			.hs-ooui-card-body {
				min-width: 0;
			}
			/* Màn hẹp: trường căn trái/phải xuống dòng dưới nhãn, nhãn dài không khoảng trắng được ngắt */
			.hs-ooui-card-body .oo-ui-fieldLayout-body {
				flex-wrap: wrap;
			}
			.hs-ooui-card-body .oo-ui-fieldLayout-header .oo-ui-labelElement-label {
				overflow-wrap: anywhere;
			}
			.hs-ooui-grid--icons .hs-ooui-card {
				padding: 0.4rem 0.55rem;
			}
			.hs-ooui-grid--icons .oo-ui-fieldLayout-body {
				align-items: center;
			}
			.hs-ooui-grid--icons .oo-ui-fieldLayout.oo-ui-labelElement > .oo-ui-fieldLayout-body > .oo-ui-fieldLayout-header {
				padding-bottom: 0;
				font: 500 0.76rem/1.2 ui-monospace, SFMono-Regular, Consolas, monospace;
				word-break: break-all;
			}
			@media (max-width: 639px) {
				.hs-ooui-toolbar {
					position: static;
					padding: 0.55rem;
				}
				.hs-ooui-search {
					max-width: none;
					width: 100%;
				}
				.hs-ooui-grid,
				.hs-ooui-grid--wide {
					grid-template-columns: 1fr;
				}
				.hs-ooui-grid--icons {
					grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
				}
			}
		`).appendTo(document.head);
	}

	function detectMeta($el, fallbackIdx) {
		const classes = ($el.attr('class') || '').split(/\s+/);
		const mainCls = [...classes].reverse().find(c =>
			c.startsWith('oo-ui-') &&
			(c.endsWith('Widget') || c.endsWith('Layout')) &&
			c !== 'oo-ui-widget' &&
			c !== 'oo-ui-layout'
		) || ('oo-ui-item-' + fallbackIdx);
		const name = mainCls.replace(/^oo-ui-/, '');
		const flags = [];
		if (classes.includes('oo-ui-widget-disabled')) flags.push('vô hiệu');
		if (classes.includes('oo-ui-flaggedElement-primary')) flags.push('primary');
		if (classes.includes('oo-ui-flaggedElement-progressive')) flags.push('progressive');
		if (classes.includes('oo-ui-flaggedElement-destructive')) flags.push('destructive');
		if (classes.includes('oo-ui-flaggedElement-notice')) flags.push('notice');
		if (classes.includes('oo-ui-flaggedElement-error')) flags.push('error');
		if (classes.includes('oo-ui-flaggedElement-warning')) flags.push('warning');
		if (classes.includes('oo-ui-flaggedElement-success')) flags.push('success');
		if (classes.includes('oo-ui-buttonElement-frameless')) flags.push('không viền');
		return { name, flags: flags.join(' · ') };
	}

	function makeCard(item, idx, showMeta) {
		const $el = item.$element ? item.$element : $(item);
		const meta = detectMeta($el, idx);
		const isWide =
			meta.name === 'messageWidget' ||
			meta.name === 'multilineTextInputWidget' ||
			meta.name === 'tagMultiselectWidget' ||
			meta.name === 'menuTagMultiselectWidget' ||
			$el.find('.oo-ui-bookletLayout, .oo-ui-indexLayout').length > 0;
		const $card = $('<div class="hs-ooui-card"></div>');
		if ($el.find('.oo-ui-bookletLayout, .oo-ui-indexLayout').length > 0) {
			$card.addClass('hs-ooui-card--span');
		}
		if (showMeta) {
			const $meta = $('<div class="hs-ooui-card-meta"></div>');
			$meta.append($('<span></span>').text(meta.name));
			if (meta.flags) {
				$meta.append($('<span class="hs-ooui-card-Flags"></span>').text(meta.flags));
			}
			$card.append($meta);
		}
		$card.append($('<div class="hs-ooui-card-body"></div>').append($el));
		$card.attr('data-search', (meta.name + ' ' + meta.flags + ' ' + $el.text()).toLowerCase());
		return { $card, meta, isWide };
	}

	const allWidgets = widgets();
	const btnWidgets = [];
	const inputWidgets = [];
	const msgWidgets = [];

	allWidgets.forEach((w, idx) => {
		const $el = w.$element || $(w);
		const cls = ($el.attr('class') || '');
		if (/messageWidget|progressBarWidget|iconWidget|indicatorWidget|labelWidget/.test(cls)) {
			msgWidgets.push({ w, idx: idx + 1 });
		} else if (/buttonWidget|buttonInputWidget|toggleButtonWidget|buttonGroupWidget|buttonSelectWidget|toggleSwitchWidget|buttonMenuSelectWidget|popupButtonWidget/.test(cls)) {
			btnWidgets.push({ w, idx: idx + 1 });
		} else {
			inputWidgets.push({ w, idx: idx + 1 });
		}
	});

	const allLayouts = layouts();
	const allDialogs = dialogs();
	const allIcons = icons();

	const sections = [
		{
			id: 'buttons',
			title: '1. Nút bấm, Công tắc & Menu bật lên',
			gridClass: 'hs-ooui-grid',
			items: btnWidgets.map(x => makeCard(x.w, x.idx, true).$card)
		},
		{
			id: 'inputs',
			title: '2. Ô nhập liệu, Danh sách chọn & Đa thẻ (Tags)',
			gridClass: 'hs-ooui-grid',
			items: inputWidgets.map(x => makeCard(x.w, x.idx, true).$card)
		},
		{
			id: 'messages',
			title: '3. Thông báo, Thanh tiến trình & Nhãn',
			gridClass: 'hs-ooui-grid hs-ooui-grid--wide',
			items: msgWidgets.map(x => makeCard(x.w, x.idx, true).$card)
		},
		{
			id: 'layouts',
			title: '4. Bố cục trường, Biểu mẫu, Sổ tay & Thẻ (Tabs)',
			gridClass: 'hs-ooui-grid hs-ooui-grid--wide',
			items: allLayouts.map((l, i) => makeCard(l, i + 1, true).$card)
		},
		{
			id: 'dialogs',
			title: '5. Hộp thoại & Cửa sổ (Nhấn để mở thử)',
			gridClass: 'hs-ooui-grid hs-ooui-grid--wide',
			items: allDialogs.slice(0, -1).map((d, i) => makeCard(d, i + 1, false).$card)
		},
		{
			id: 'icons',
			title: '6. Bảng biểu tượng OOUI (' + allIcons.length + ' biểu tượng)',
			gridClass: 'hs-ooui-grid hs-ooui-grid--icons',
			items: allIcons.map((ic, i) => makeCard(ic, i + 1, false).$card)
		}
	];

	const $wrapper = $('<div class="hs-ooui-demo"></div>');
	const $toolbar = $('<div class="hs-ooui-toolbar"></div>');
	const $nav = $('<div class="hs-ooui-nav" role="tablist" aria-label="Bộ lọc nhóm OOUI"></div>');

	const navTabs = [{ id: 'all', label: 'Tất cả (' + (allWidgets.length + allLayouts.length + allIcons.length) + ')' }].concat(
		sections.map(s => ({ id: s.id, label: s.title.replace(/^\d+\.\s*/, '').replace(/\s*\(.*\)$/, '') + ' (' + s.items.length + ')' }))
	);

	let activeTab = 'all';
	let searchQuery = '';

	function applyFilters() {
		const q = searchQuery.trim().toLowerCase();
		$wrapper.find('.hs-ooui-section').each(function () {
			const $sec = $(this);
			const secId = $sec.attr('data-section');
			const tabMatch = (activeTab === 'all' || activeTab === secId);
			if (!tabMatch) {
				$sec.attr('hidden', 'hidden');
				return;
			}
			let visibleCount = 0;
			$sec.find('.hs-ooui-card').each(function () {
				const $c = $(this);
				const hay = $c.attr('data-search') || '';
				const match = !q || hay.includes(q);
				if (match) {
					$c.removeAttr('hidden');
					visibleCount++;
				} else {
					$c.attr('hidden', 'hidden');
				}
			});
			if (visibleCount > 0) {
				$sec.removeAttr('hidden');
				$sec.find('.hs-ooui-section-count').text(visibleCount + ' mẫu');
			} else {
				$sec.attr('hidden', 'hidden');
			}
		});
	}

	navTabs.forEach(t => {
		const $btn = $('<button type="button" class="hs-ooui-nav-btn"></button>')
			.text(t.label)
			.toggleClass('is-active', t.id === 'all')
			.on('click', () => {
				activeTab = t.id;
				$nav.find('.hs-ooui-nav-btn').removeClass('is-active');
				$btn.addClass('is-active');
				applyFilters();
			});
		$nav.append($btn);
	});

	const searchInput = new OO.ui.SearchInputWidget({
		placeholder: 'Lọc nhanh theo tên class, nhãn, cờ (vd: message, dropdown, destructive)...'
	});
	searchInput.$element.addClass('hs-ooui-search');
	searchInput.on('change', val => {
		searchQuery = val || '';
		applyFilters();
	});

	$toolbar.append($nav, searchInput.$element);
	$wrapper.append($toolbar);

	sections.forEach(s => {
		const $sec = $('<section class="hs-ooui-section"></section>').attr('data-section', s.id);
		const $head = $('<h3 class="hs-ooui-section-head"></h3>')
			.append($('<span></span>').text(s.title))
			.append($('<span class="hs-ooui-section-count"></span>').text(s.items.length + ' mẫu'));
		const $grid = $('<div></div>').addClass(s.gridClass);
		s.items.forEach($card => $grid.append($card));
		$sec.append($head, $grid);
		$wrapper.append($sec);
	});

	// Append WindowManager for interactive dialogs
	if (allDialogs.length > 0) {
		$wrapper.append(allDialogs[allDialogs.length - 1]);
	}

	$('#ooui-test').html('').append($wrapper);
	window._oouiDone = true;
}).catch(error => {
	console.error(error);
});

function widgets() {
	const widgetsList = [];

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	label: 'Bình thường'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	label: 'Chính · Tiến trình',
	flags: [
		'primary',
		'progressive'
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	label: 'Chính · Nguy hiểm',
	flags: [
		'primary',
		'destructive'
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	label: 'Tiến trình',
	flags: [
		'progressive'
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	label: 'Nguy hiểm',
	flags: [
		'destructive'
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	label: 'Vô hiệu hóa',
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	label: 'Tiến trình',
	icon: 'tag',
	flags: [
		'progressive'
	],
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	label: 'Biểu tượng',
	icon: 'tag'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	label: 'Biểu tượng',
	icon: 'tag',
	flags: [
		'progressive'
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	label: 'Chỉ báo',
	indicator: 'down'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	label: 'Chỉ báo',
	indicator: 'down',
	flags: [
		'progressive'
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	label: 'Phím tắt: G',
	accessKey: 'g'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	icon: 'edit',
	label: 'Sửa',
	invisibleLabel: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	framed: false,
	icon: 'edit',
	label: 'Sửa',
	invisibleLabel: true,
	title: 'Chỉ có biểu tượng'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	framed: false,
	icon: 'tag',
	label: 'Có nhãn'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	framed: false,
	flags: [
		'progressive'
	],
	icon: 'check',
	label: 'Tiến trình'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	framed: false,
	flags: [
		'destructive'
	],
	icon: 'trash',
	label: 'Nguy hiểm'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	framed: false,
	flags: [
		'destructive'
	],
	label: 'Hủy'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	framed: false,
	icon: 'tag',
	label: 'Vô hiệu hóa',
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	framed: false,
	icon: 'tag',
	indicator: 'down',
	label: 'Có nhãn'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	framed: false,
	indicator: 'down',
	label: 'Có nhãn'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	framed: false,
	icon: 'tag',
	indicator: 'down',
	title: 'Biểu tượng & chỉ báo'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	framed: false,
	flags: [
		'progressive'
	],
	label: 'Tài liệu',
	href: 'https://doc.wikimedia.org',
	rel: [
		'noreferrer',
		'noopener'
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ButtonWidget( {
	framed: false,
	flags: [
		'progressive'
	],
	label: 'Tài liệu',
	href: 'https://doc.wikimedia.org',
	rel: ''
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonInputWidget
new OO.ui.ButtonInputWidget( {
	type: 'submit',
	useInputTag: true,
	label: 'Gửi biểu mẫu',
	flags: [
		'primary',
		'progressive'
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonInputWidget
new OO.ui.ButtonInputWidget( {
	label: 'Nút bấm khác'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonInputWidget
new OO.ui.ButtonInputWidget( {
	label: 'Phím tắt: H',
	title: 'Phím tắt được tự động thêm vào chú thích nổi.',
	accessKey: 'h'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonInputWidget
new OO.ui.ButtonInputWidget( {
	framed: false,
	label: 'Nút bấm khác'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonInputWidget
new OO.ui.ButtonInputWidget( {
	useInputTag: true,
	framed: false,
	label: 'Nút bấm khác'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ToggleButtonWidget
new OO.ui.ToggleButtonWidget( {
	label: 'Bật / Tắt'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ToggleButtonWidget
new OO.ui.ToggleButtonWidget( {
	label: 'Bật / Tắt',
	value: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ToggleButtonWidget
new OO.ui.ToggleButtonWidget( {
	icon: 'previous',
	label: 'Trước',
	invisibleLabel: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ToggleButtonWidget
new OO.ui.ToggleButtonWidget( {
	icon: 'next',
	label: 'Tiếp',
	invisibleLabel: true,
	value: true,
	title: ''
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ToggleButtonWidget
new OO.ui.ToggleButtonWidget( {
	label: 'Bật / Tắt',
	framed: false
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ToggleButtonWidget
new OO.ui.ToggleButtonWidget( {
	label: 'Bật / Tắt',
	framed: false,
	value: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ToggleButtonWidget
new OO.ui.ToggleButtonWidget( {
	icon: 'pushPin',
	label: 'Ghim',
	invisibleLabel: true,
	framed: false
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ToggleButtonWidget
new OO.ui.ToggleButtonWidget( {
	icon: 'pushPin',
	label: 'Ghim',
	invisibleLabel: true,
	framed: false,
	value: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonGroupWidget
new OO.ui.ButtonGroupWidget( {
	items: [
		new OO.ui.ButtonWidget( {
			icon: 'tag',
			label: 'Một'
		} ),
		new OO.ui.ButtonWidget( {
			label: 'Hai'
		} ),
		new OO.ui.ButtonWidget( {
			label: 'Ba'
		} )
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonGroupWidget
new OO.ui.ButtonGroupWidget( {
	items: [
		new OO.ui.ButtonWidget( {
			label: 'Một',
			flags: [
				'destructive'
			]
		} ),
		new OO.ui.ButtonWidget( {
			label: 'Hai',
			flags: [
				'progressive'
			]
		} )
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonGroupWidget
new OO.ui.ButtonGroupWidget( {
	items: [
		new OO.ui.ButtonWidget( {
			icon: 'tag',
			label: 'Thẻ',
			invisibleLabel: true,
			flags: [
				'destructive'
			]
		} ),
		new OO.ui.ButtonWidget( {
			label: 'Hai',
			flags: [
				'progressive'
			]
		} )
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonGroupWidget
new OO.ui.ButtonGroupWidget( {
	items: [
		new OO.ui.ToggleButtonWidget( {
			icon: 'tag',
			label: 'Một'
		} ),
		new OO.ui.ToggleButtonWidget( {
			label: 'Hai'
		} ),
		new OO.ui.ToggleButtonWidget( {
			label: 'Ba'
		} )
	],
	title: 'Hãy chọn cẩn thận'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonSelectWidget
new OO.ui.ButtonSelectWidget( {
	items: [
		new OO.ui.ButtonOptionWidget( {
			data: 'b',
			icon: 'tag',
			label: 'Một'
		} ),
		new OO.ui.ButtonOptionWidget( {
			data: 'c',
			label: 'Hai'
		} ),
		new OO.ui.ButtonOptionWidget( {
			data: 'd',
			label: 'Ba'
		} )
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonSelectWidget
new OO.ui.ButtonSelectWidget( {
	disabled: true,
	items: [
		new OO.ui.ButtonOptionWidget( {
			data: 'b',
			icon: 'tag',
			label: 'Một'
		} ),
		new OO.ui.ButtonOptionWidget( {
			data: 'c',
			label: 'Hai'
		} ),
		new OO.ui.ButtonOptionWidget( {
			data: 'd',
			label: 'Ba'
		} )
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonSelectWidget
new OO.ui.ButtonSelectWidget( {
	items: [
		new OO.ui.ButtonOptionWidget( {
			data: 'b',
			icon: 'tag',
			label: 'Một',
			disabled: true
		} ),
		new OO.ui.ButtonOptionWidget( {
			data: 'c',
			label: 'Hai'
		} ),
		new OO.ui.ButtonOptionWidget( {
			data: 'd',
			label: 'Ba'
		} )
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonSelectWidget
new OO.ui.ButtonSelectWidget( {
	items: [
		new OO.ui.ButtonOptionWidget( {
			data: 'a',
			label: 'Phím tắt: I',
			accessKey: 'i',
			title: 'Nhấn tổ hợp phím tắt trình duyệt + '
		} ),
		new OO.ui.ButtonOptionWidget( {
			data: 'b',
			label: 'Phím tắt: J',
			accessKey: 'j'
		} ),
		new OO.ui.ButtonOptionWidget( {
			data: 'c',
			label: 'Phím tắt: K',
			accessKey: 'k'
		} )
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.TextInputWidget( {
	value: 'Ô nhập văn bản'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.TextInputWidget( {
	icon: 'globe'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.TextInputWidget( {
	required: true,
	validate: 'non-empty'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.TextInputWidget( {
	validate: function ( value ) {
		return value.length % 2 === 0;
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.TextInputWidget( {
	placeholder: 'Văn bản gợi ý (Placeholder)...'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.TextInputWidget( {
	value: 'Có chú thích nổi (title)',
	title: 'Thuộc tính title hiển thị thêm thông tin khi di chuột vào.'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.TextInputWidget( {
	value: 'Chỉ đọc (Readonly)',
	readOnly: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.TextInputWidget( {
	value: 'Đang vô hiệu hóa',
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MultilineTextInputWidget
new OO.ui.MultilineTextInputWidget( {
	value: 'Nhiều dòng\nDòng thứ hai'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MultilineTextInputWidget
new OO.ui.MultilineTextInputWidget( {
	rows: 15,
	value: 'Nhiều dòng\nDòng thứ hai'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MultilineTextInputWidget
new OO.ui.MultilineTextInputWidget( {
	autosize: true,
	value: 'Tự động giãn chiều cao\nDòng 2\nDòng 3\nDòng 4'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MultilineTextInputWidget
new OO.ui.MultilineTextInputWidget( {
	rows: 10,
	autosize: true,
	value: 'Tự động giãn chiều cao\nDòng 2\nDòng 3\nDòng 4'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MultilineTextInputWidget
new OO.ui.MultilineTextInputWidget( {
	autosize: true,
	icon: 'tag',
	indicator: 'required',
	label: 'Nhãn nội dòng',
	value: 'Tự động giãn chiều cao\nDòng 2\nDòng 3\nDòng 4'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.TextInputWidget( {
	value: 'Ô nhập có nhãn đi kèm',
	label: 'Nhãn nội dòng'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.TextInputWidget( {
	labelPosition: 'before',
	value: 'Ô nhập có nhãn đi kèm',
	label: 'Nhãn nội dòng'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.TextInputWidget( {
	icon: 'tag',
	indicator: 'required',
	value: 'Ô nhập có nhãn đi kèm',
	label: 'Nhãn nội dòng'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.TextInputWidget( {
	labelPosition: 'before',
	icon: 'tag',
	indicator: 'required',
	value: 'Ô nhập có nhãn đi kèm',
	label: 'Nhãn nội dòng'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.TextInputWidget( {
	value: 'Đang vô hiệu hóa',
	icon: 'tag',
	indicator: 'required',
	label: 'Nhãn nội dòng',
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.TextInputWidget( {
	value: 'Phím tắt: S',
	accessKey: 's'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SearchInputWidget
new OO.ui.SearchInputWidget());

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SearchInputWidget
new OO.ui.SearchInputWidget( {
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SearchInputWidget
new OO.ui.SearchInputWidget( {
	disabled: true,
	value: 'Tìm kiếm bị vô hiệu hóa'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.NumberInputWidget
new OO.ui.NumberInputWidget());

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.NumberInputWidget
new OO.ui.NumberInputWidget( {
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.NumberInputWidget
new OO.ui.NumberInputWidget( {
	min: 1,
	max: 5,
	step: 1
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.NumberInputWidget
new OO.ui.NumberInputWidget( {
	min: -1,
	max: 1,
	step: 0.1,
	pageStep: 0.5
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.NumberInputWidget
new OO.ui.NumberInputWidget( {
	showButtons: false
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.CheckboxInputWidget
new OO.ui.CheckboxInputWidget( {
	selected: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.CheckboxInputWidget
new OO.ui.CheckboxInputWidget( {
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.CheckboxInputWidget
new OO.ui.CheckboxInputWidget( {
	selected: true,
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.CheckboxInputWidget
new OO.ui.CheckboxInputWidget( {
	selected: true,
	required: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.CheckboxInputWidget
new OO.ui.CheckboxInputWidget( {
	selected: true,
	accessKey: 't'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.CheckboxInputWidget
new OO.ui.CheckboxInputWidget( {
	indeterminate: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.CheckboxInputWidget
new OO.ui.CheckboxInputWidget( {
	indeterminate: true,
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.RadioInputWidget
new OO.ui.RadioInputWidget( {
	name: 'oojs-ui-radio-demo'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.RadioInputWidget
new OO.ui.RadioInputWidget( {
	name: 'oojs-ui-radio-demo',
	selected: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.RadioInputWidget
new OO.ui.RadioInputWidget( {
	selected: true,
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.RadioInputWidget
new OO.ui.RadioInputWidget( {
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.RadioInputWidget
new OO.ui.RadioInputWidget( {
	selected: false,
	required: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.RadioSelectWidget
new OO.ui.RadioSelectWidget( {
	items: [
		new OO.ui.RadioOptionWidget( {
			data: 'cat',
			label: 'Mèo'
		} ),
		new OO.ui.RadioOptionWidget( {
			data: 'dog',
			label: 'Chó'
		} ),
		new OO.ui.RadioOptionWidget( {
			data: 'goldfish',
			label: 'Cá vàng. Nhân tiện, đây là một nhãn rất dài dùng để kiểm thử khả năng tự xuống dòng của văn bản khi chiều rộng màn hình thay đổi.\u200e',
			disabled: true
		} )
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.RadioSelectInputWidget
new OO.ui.RadioSelectInputWidget( {
	value: 'dog',
	options: [
		{
			data: 'cat',
			label: 'Mèo'
		},
		{
			data: 'dog',
			label: 'Chó'
		},
		{
			data: 'goldfish',
			label: 'Cá vàng'
		}
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.CheckboxMultiselectInputWidget
new OO.ui.CheckboxMultiselectInputWidget( {
	value: [
		'dog',
		'cat'
	],
	options: [
		{
			data: 'cat',
			label: 'Mèo'
		},
		{
			data: 'dog',
			label: 'Chó (vô hiệu hóa)',
			disabled: true
		},
		{
			data: 'goldfish',
			label: 'Cá vàng'
		}
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.RadioSelectWidget
new OO.ui.RadioSelectWidget( {
	items: [
		new OO.ui.RadioOptionWidget( {
			data: 'a',
			label: 'Phím tắt: M',
			accessKey: 'm'
		} ),
		new OO.ui.RadioOptionWidget( {
			data: 'b',
			label: 'Phím tắt: N',
			accessKey: 'n'
		} ),
		new OO.ui.RadioOptionWidget( {
			data: 'c',
			label: 'Phím tắt: O',
			accessKey: 'o'
		} )
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ToggleSwitchWidget
new OO.ui.ToggleSwitchWidget());

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ToggleSwitchWidget
new OO.ui.ToggleSwitchWidget( {
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ToggleSwitchWidget
new OO.ui.ToggleSwitchWidget( {
	disabled: true,
	value: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.RadioSelectWidget
new OO.ui.RadioSelectWidget( {
	items: [
		new OO.ui.RadioOptionWidget( {
			data: 'a',
			label: $( undefined )
		} ),
		new OO.ui.RadioOptionWidget( {
			data: 'b',
			label: $( undefined )
		} ),
		new OO.ui.RadioOptionWidget( {
			data: 'c',
			label: $( undefined )
		} )
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.RadioSelectWidget
new OO.ui.RadioSelectWidget( {
	items: [
		new OO.ui.RadioOptionWidget( {
			data: 'foo',
			label: 'Foo'
		} ),
		new OO.ui.RadioOptionWidget( {
			data: 'bar',
			label: 'Bar'
		} ),
		new OO.ui.RadioOptionWidget( {
			data: '',
			label: $( undefined )
		} )
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.DropdownWidget
new OO.ui.DropdownWidget( {
	label: 'Chọn một mục',
	menu: {
		items: [
			new OO.ui.MenuOptionWidget( {
				data: 'a',
				label: 'Mục thứ nhất'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'b',
				label: 'Mục thứ hai',
				indicator: 'required'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'c',
				label: 'Mục thứ ba'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'c',
				label: 'Mục chọn thứ tư có nhãn văn bản rất dài để kiểm thử tràn dòng'
			} ),
			new OO.ui.MenuOptionWidget( {
				icon: 'feedback',
				data: 'd',
				label: 'Mục chọn thứ năm có biểu tượng đi kèm'
			} )
		]
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.DropdownWidget
new OO.ui.DropdownWidget( {
	label: 'Chọn một mục',
	icon: 'tag',
	menu: {
		items: [
			new OO.ui.MenuOptionWidget( {
				data: 'a',
				label: 'Mục thứ nhất'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'b',
				label: 'Mục thứ hai (đã khóa)',
				indicator: 'required',
				disabled: true
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'c',
				label: 'Mục thứ ba'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'd',
				label: 'Mục thứ tư đã khóa kèm nhãn văn bản rất dài',
				disabled: true
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'c',
				label: 'Mục thứ ba'
			} )
		]
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.DropdownWidget
new OO.ui.DropdownWidget( {
	label: 'Chọn một mục',
	menu: {
		items: [
			new OO.ui.MenuSectionOptionWidget( {
				label: 'Các giống chó'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'corgi',
				label: 'Chó Corgi xứ Wales',
				indicator: 'required'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'poodle',
				label: 'Chó Poodle tiêu chuẩn',
				icon: 'star'
			} ),
			new OO.ui.MenuSectionOptionWidget( {
				label: 'Họ nhà mèo'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'lion',
				label: 'Sư tử'
			} )
		]
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.DropdownWidget
new OO.ui.DropdownWidget( {
	label: 'Chọn một mục',
	disabled: true,
	menu: {
		items: [
			new OO.ui.MenuOptionWidget( {
				data: 'a',
				label: 'Mục thứ nhất'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'b',
				label: 'Mục thứ hai'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'c',
				label: 'Mục thứ ba'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'd',
				label: 'Mục thứ tư'
			} )
		]
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.DropdownWidget
new OO.ui.DropdownWidget( {
	label: 'Chọn một mục',
	$overlay: true,
	menu: {
		items: [
			new OO.ui.MenuOptionWidget( {
				data: 'a',
				label: 'Mục thứ nhất'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'b',
				label: 'Mục thứ hai'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'c',
				label: 'Mục thứ ba'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'd',
				label: 'Mục thứ tư'
			} )
		]
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.DropdownWidget
new OO.ui.DropdownWidget( {
	label: 'Chọn một mục',
	$overlay: $( '#demo-overlay' ),
	menu: {
		items: [
			new OO.ui.MenuOptionWidget( {
				data: 'a',
				label: 'Mục thứ nhất'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'b',
				label: 'Mục thứ hai'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'c',
				label: 'Mục thứ ba'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'd',
				label: 'Mục thứ tư'
			} )
		]
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.DropdownWidget
new OO.ui.DropdownWidget( {
	label: 'Chọn một mục',
	menu: {
		items: [
			new OO.ui.MenuOptionWidget( {
				data: 'a',
				label: 'Mục thứ nhất'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'b',
				label: 'Mục thứ hai'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'c',
				label: 'Mục thứ ba'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'd',
				label: 'Mục thứ tư'
			} )
		],
		hideOnChoose: false
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.DropdownWidget
new OO.ui.DropdownWidget( {
	label: 'Chọn một mục',
	menu: {
		items: [
			new OO.ui.MenuOptionWidget( {
				data: 'a',
				label: 'Phím tắt: P',
				accessKey: 'p'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'b',
				label: 'Phím tắt: Q',
				accessKey: 'q'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'c',
				label: 'Phím tắt: R',
				accessKey: 'r'
			} )
		]
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.DropdownInputWidget
new OO.ui.DropdownInputWidget( {
	options: [
		{
			data: 'a',
			label: 'Mục thứ nhất'
		},
		{
			data: 'b',
			label: 'Mục thứ hai'
		},
		{
			data: 'c',
			label: 'Mục thứ ba'
		}
	],
	value: 'b'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.DropdownInputWidget
new OO.ui.DropdownInputWidget( {
	disabled: true,
	title: 'Danh sách thả xuống (đã vô hiệu hóa)'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.DropdownInputWidget
new OO.ui.DropdownInputWidget( {
	required: true,
	options: [
		{
			data: 'a',
			label: 'Mục thứ nhất'
		},
		{
			data: 'b',
			label: 'Mục thứ hai'
		},
		{
			data: 'c',
			label: 'Mục thứ ba'
		}
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.DropdownInputWidget
new OO.ui.DropdownInputWidget( {
	options: [
		{
			optgroup: 'Nguyên âm'
		},
		{
			data: 'a',
			label: 'A'
		},
		{
			optgroup: 'Phụ âm'
		},
		{
			data: 'b',
			label: 'B'
		},
		{
			data: 'c',
			label: 'C'
		}
	],
	value: 'b'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.DropdownInputWidget
new OO.ui.DropdownInputWidget( {
	options: [
		{
			data: 'top',
			label: 'Lựa chọn cấp cao nhất'
		},
		{
			optgroup: 'Cả nhóm bị vô hiệu hóa',
			disabled: true
		},
		{
			data: 'a',
			label: 'A'
		},
		{
			optgroup: 'Nhóm có một mục bị khóa'
		},
		{
			data: 'b',
			label: 'B'
		},
		{
			data: 'c',
			label: 'C',
			disabled: true
		},
		{
			data: 'd',
			label: 'D'
		}
	],
	value: 'b'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.DropdownInputWidget
new OO.ui.DropdownInputWidget( {
	options: [
		{
			data: 'sq',
			label: 'Albanian'
		},
		{
			data: 'frp',
			label: 'Arpitan'
		},
		{
			data: 'ba',
			label: 'Bashkir'
		},
		{
			data: 'pt-br',
			label: 'Brazilian Portuguese'
		},
		{
			data: 'tzm',
			label: 'Central Atlas Tamazight'
		},
		{
			data: 'zh',
			label: 'Chinese'
		},
		{
			data: 'co',
			label: 'Corsican'
		},
		{
			data: 'del',
			label: 'Delaware'
		},
		{
			data: 'eml',
			label: 'Emiliano-Romagnolo'
		},
		{
			data: 'en',
			label: 'English'
		},
		{
			data: 'fi',
			label: 'Finnish'
		},
		{
			data: 'aln',
			label: 'Gheg Albanian'
		},
		{
			data: 'he',
			label: 'Hebrew'
		},
		{
			data: 'ilo',
			label: 'Iloko'
		},
		{
			data: 'kbd',
			label: 'Kabardian'
		},
		{
			data: 'csb',
			label: 'Kashubian'
		},
		{
			data: 'avk',
			label: 'Kotava'
		},
		{
			data: 'lez',
			label: 'Lezghian'
		},
		{
			data: 'nds-nl',
			label: 'Low Saxon'
		},
		{
			data: 'ml',
			label: 'Malayalam'
		},
		{
			data: 'dum',
			label: 'Middle Dutch'
		},
		{
			data: 'ary',
			label: 'Moroccan Arabic'
		},
		{
			data: 'pih',
			label: 'Norfuk / Pitkern'
		},
		{
			data: 'ny',
			label: 'Nyanja'
		},
		{
			data: 'ang',
			label: 'Old English'
		},
		{
			data: 'non',
			label: 'Old Norse'
		},
		{
			data: 'pau',
			label: 'Palauan'
		},
		{
			data: 'pdt',
			label: 'Plautdietsch'
		},
		{
			data: 'ru',
			label: 'Russian'
		},
		{
			data: 'stq',
			label: 'Saterland Frisian'
		},
		{
			data: 'ii',
			label: 'Sichuan Yi'
		},
		{
			data: 'bcc',
			label: 'Southern Balochi'
		},
		{
			data: 'shi',
			label: 'Tachelhit'
		},
		{
			data: 'vi',
			label: 'Tiếng Việt'
		},
		{
			data: 'th',
			label: 'Thai'
		},
		{
			data: 'tr',
			label: 'Turkish'
		},
		{
			data: 'fiu-vro',
			label: 'Võro'
		},
		{
			data: 'vls',
			label: 'West Flemish'
		},
		{
			data: 'zea',
			label: 'Zeelandic'
		}
	],
	value: 'vi'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ComboBoxInputWidget
new OO.ui.ComboBoxInputWidget( {
	options: [
		{
			data: 'asd',
			label: 'Nhãn cho asd'
		},
		{
			data: 'fgh',
			label: 'Nhãn cho fgh'
		},
		{
			data: 'jkl',
			label: 'Nhãn cho jkl'
		},
		{
			data: 'zxc',
			label: 'Nhãn cho zxc'
		},
		{
			data: 'vbn',
			label: 'Nhãn cho vbn'
		}
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ComboBoxInputWidget
new OO.ui.ComboBoxInputWidget( {
	options: [
		{
			data: 'asd',
			label: 'asd'
		},
		{
			data: 'fgh',
			label: 'fgh'
		},
		{
			data: 'jkl',
			label: 'jkl'
		},
		{
			data: 'zxc',
			label: 'zxc'
		},
		{
			data: 'vbn',
			label: 'vbn'
		}
	],
	menu: {
		filterFromInput: true
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ComboBoxInputWidget
new OO.ui.ComboBoxInputWidget( {
	options: [
		{
			data: 'Lựa chọn 1'
		},
		{
			data: 'Lựa chọn 2'
		},
		{
			data: 'Lựa chọn 3'
		},
		{
			data: 'Lựa chọn 4'
		},
		{
			data: 'Lựa chọn 5'
		}
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ComboBoxInputWidget
new OO.ui.ComboBoxInputWidget( {
	disabled: true,
	options: [
		{
			data: 'asd',
			label: 'Nhãn cho asd'
		},
		{
			data: 'fgh',
			label: 'Nhãn cho fgh'
		},
		{
			data: 'jkl',
			label: 'Nhãn cho jkl'
		},
		{
			data: 'zxc',
			label: 'Nhãn cho zxc'
		},
		{
			data: 'vbn',
			label: 'Nhãn cho vbn'
		}
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ComboBoxInputWidget
new OO.ui.ComboBoxInputWidget());

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SelectFileInputWidget
new OO.ui.SelectFileInputWidget());

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SelectFileInputWidget
new OO.ui.SelectFileInputWidget( {
	$tabIndexed: $( '<a class="oo-ui-buttonElement-button" role="button" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon oo-ui-iconElement-noIcon"></span><span class="oo-ui-labelElement-label">Chọn nhiều tập tin</span><span class="oo-ui-indicatorElement-indicator oo-ui-indicatorElement-noIndicator"></span><input title="" class="oo-ui-inputWidget-input" type="file" tabindex="-1" multiple="multiple"></a>' ),
	multiple: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SelectFileInputWidget
new OO.ui.SelectFileInputWidget( {
	$tabIndexed: $( '<a class="oo-ui-buttonElement-button" role="button" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon oo-ui-icon-upload oo-ui-image-invert"></span><span class="oo-ui-labelElement-label">Nút tải lên tùy chỉnh</span><span class="oo-ui-indicatorElement-indicator oo-ui-indicatorElement-noIndicator oo-ui-image-invert"></span><input title="" class="oo-ui-inputWidget-input" type="file" tabindex="-1"></a>' ),
	button: {
		flags: [
			'primary',
			'progressive'
		],
		icon: 'upload',
		label: 'Nút tải lên tùy chỉnh'
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SelectFileInputWidget
new OO.ui.SelectFileInputWidget( {
	accept: [
		'image/png',
		'image/jpeg'
	],
	$tabIndexed: $( '<a class="oo-ui-buttonElement-button" role="button" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon oo-ui-iconElement-noIcon"></span><span class="oo-ui-labelElement-label">Chọn tập tin</span><span class="oo-ui-indicatorElement-indicator oo-ui-indicatorElement-noIndicator"></span><input title="This SelectFileInputWidget accepts only PNG `image/png` and JPEG `image/jpeg` files and has `title` configured" class="oo-ui-inputWidget-input" type="file" tabindex="-1" accept="image/png, image/jpeg"></a>' ),
	title: 'This SelectFileInputWidget accepts only PNG `image/png` and JPEG `image/jpeg` files and has `title` configured'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SelectFileInputWidget
new OO.ui.SelectFileInputWidget( {
	icon: 'tag'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SelectFileInputWidget
new OO.ui.SelectFileInputWidget( {
	$tabIndexed: $( '<a class="oo-ui-buttonElement-button" role="button" tabindex="-1" rel="nofollow" aria-disabled="true"><span class="oo-ui-iconElement-icon oo-ui-iconElement-noIcon oo-ui-image-invert"></span><span class="oo-ui-labelElement-label">Chọn tập tin</span><span class="oo-ui-indicatorElement-indicator oo-ui-indicatorElement-noIndicator oo-ui-image-invert"></span><input title="" class="oo-ui-inputWidget-input" disabled="" type="file" tabindex="-1"></a>' ),
	icon: 'tag',
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SelectFileInputWidget
new OO.ui.SelectFileInputWidget( {
	$tabIndexed: $( '<a class="oo-ui-buttonElement-button" role="button" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon oo-ui-iconElement-noIcon"></span><span class="oo-ui-labelElement-label">Chọn tập tin</span><span class="oo-ui-indicatorElement-indicator oo-ui-indicatorElement-noIndicator"></span><input title="" class="oo-ui-inputWidget-input" required="" type="file" tabindex="-1"></a>' ),
	icon: 'tag',
	required: true
} ));

/*
widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SelectFileWidget
new OO.ui.SelectFileWidget());

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SelectFileWidget
new OO.ui.SelectFileWidget( {
	buttonOnly: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SelectFileWidget
new OO.ui.SelectFileWidget( {
	$tabIndexed: $( '<a class="oo-ui-buttonElement-button" role="button" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon oo-ui-iconElement-noIcon"></span><span class="oo-ui-labelElement-label">Chọn nhiều tập tin</span><span class="oo-ui-indicatorElement-indicator oo-ui-indicatorElement-noIndicator"></span><input title="" class="oo-ui-inputWidget-input" type="file" tabindex="-1" multiple="multiple"></a>' ),
	multiple: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SelectFileWidget
new OO.ui.SelectFileWidget( {
	accept: [
		'image/png',
		'image/jpeg'
	],
	$tabIndexed: $( '<a class="oo-ui-buttonElement-button" role="button" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon oo-ui-iconElement-noIcon"></span><span class="oo-ui-labelElement-label">Chọn tập tin</span><span class="oo-ui-indicatorElement-indicator oo-ui-indicatorElement-noIndicator"></span><input title="This SelectFileWidget accepts only PNG `image/png` and JPEG `image/jpeg` files and has `title` configured" class="oo-ui-inputWidget-input" type="file" tabindex="-1" accept="image/png, image/jpeg"></a>' ),
	title: 'This SelectFileWidget accepts only PNG `image/png` and JPEG `image/jpeg` files and has `title` configured'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SelectFileWidget
new OO.ui.SelectFileWidget( {
	icon: 'tag'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SelectFileWidget
new OO.ui.SelectFileWidget( {
	$tabIndexed: $( '<a class="oo-ui-buttonElement-button" role="button" tabindex="-1" rel="nofollow" aria-disabled="true"><span class="oo-ui-iconElement-icon oo-ui-iconElement-noIcon oo-ui-image-invert"></span><span class="oo-ui-labelElement-label">Chọn tập tin</span><span class="oo-ui-indicatorElement-indicator oo-ui-indicatorElement-noIndicator oo-ui-image-invert"></span><input title="" class="oo-ui-inputWidget-input" disabled="" type="file" tabindex="-1"></a>' ),
	icon: 'tag',
	indicator: 'required',
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SelectFileWidget
new OO.ui.SelectFileWidget( {
	accept: [
		'image/png',
		'image/jpeg'
	],
	$tabIndexed: $( '<a class="oo-ui-buttonElement-button" role="button" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon oo-ui-icon-upload"></span><span class="oo-ui-labelElement-label">Chọn tập tin</span><span class="oo-ui-indicatorElement-indicator oo-ui-indicatorElement-noIndicator"></span><input title="" class="oo-ui-inputWidget-input" type="file" tabindex="-1" accept="image/png, image/jpeg"></a>' ),
	showDropTarget: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SelectFileWidget
new OO.ui.SelectFileWidget( {
	accept: [
		'image/png',
		'image/jpeg'
	],
	$tabIndexed: $( '<a class="oo-ui-buttonElement-button" role="button" tabindex="0" rel="nofollow"><span class="oo-ui-iconElement-icon oo-ui-icon-upload"></span><span class="oo-ui-labelElement-label">Chọn nhiều tập tin</span><span class="oo-ui-indicatorElement-indicator oo-ui-indicatorElement-noIndicator"></span><input title="" class="oo-ui-inputWidget-input" type="file" tabindex="-1" accept="image/png, image/jpeg" multiple="multiple"></a>' ),
	showDropTarget: true,
	multiple: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.SelectFileWidget
new OO.ui.SelectFileWidget( {
	$tabIndexed: $( '<a class="oo-ui-buttonElement-button" role="button" tabindex="-1" rel="nofollow" aria-disabled="true"><span class="oo-ui-iconElement-icon oo-ui-icon-upload oo-ui-image-invert"></span><span class="oo-ui-labelElement-label">Chọn tập tin</span><span class="oo-ui-indicatorElement-indicator oo-ui-indicatorElement-noIndicator oo-ui-image-invert"></span><input title="" class="oo-ui-inputWidget-input" disabled="" type="file" tabindex="-1"></a>' ),
	showDropTarget: true,
	disabled: true
} ));
*/

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TagMultiselectWidget
new OO.ui.TagMultiselectWidget( {
	placeholder: 'Thêm thẻ...',
	allowArbitrary: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TagMultiselectWidget
new OO.ui.TagMultiselectWidget( {
	selected: [
		'Đoạn văn bản mẫu dài trong Học Sinh Chân Kinh dùng để kiểm tra hiển thị khi nội dung vượt quá một dòng.\u200e'
	],
	allowArbitrary: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TagMultiselectWidget
new OO.ui.TagMultiselectWidget( {
	placeholder: 'Thêm thẻ...',
	allowArbitrary: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TagMultiselectWidget
new OO.ui.TagMultiselectWidget( {
	placeholder: 'Thêm thẻ...',
	allowArbitrary: true,
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TagMultiselectWidget
new OO.ui.TagMultiselectWidget( {
	allowArbitrary: false,
	allowDisplayInvalidTags: true,
	allowedValues: [
		'foo',
		'bar',
		'baz'
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TagMultiselectWidget
new OO.ui.TagMultiselectWidget( {
	placeholder: 'Thêm tối đa 5 thẻ...',
	allowArbitrary: true,
	tagLimit: 5,
	title: 'Thêm tối đa 5 thẻ'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TagMultiselectWidget
new OO.ui.TagMultiselectWidget( {
	placeholder: 'Thêm thẻ...',
	allowArbitrary: true,
	inputPosition: 'outline'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TagMultiselectWidget
new OO.ui.TagMultiselectWidget( {
	disabled: true,
	placeholder: 'Thêm thẻ...',
	allowArbitrary: true,
	inputPosition: 'outline'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TagMultiselectWidget
new OO.ui.TagMultiselectWidget( {
	allowArbitrary: true,
	inputPosition: 'outline',
	inputWidget: new OO.ui.NumberInputWidget()
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TagMultiselectWidget
new OO.ui.TagMultiselectWidget( {
	allowArbitrary: true,
	inputPosition: 'outline',
	tagLimit: 5
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MenuTagMultiselectWidget
new OO.ui.MenuTagMultiselectWidget( {
	selected: [
		{
			data: 'foo',
			label: 'Nhãn của foo'
		},
		{
			data: 'bar',
			label: 'Nhãn của bar'
		}
	],
	options: [
		{
			data: 'foo',
			label: 'Nhãn của foo',
			icon: 'tag'
		},
		{
			data: 'bar',
			label: 'Nhãn của bar'
		},
		{
			data: 'baz',
			label: 'Nhãn của baz'
		},
		{
			data: 'foo',
			label: 'Nhãn của foo'
		},
		{
			data: 'bar',
			label: 'Nhãn của bar'
		}
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MenuTagMultiselectWidget
new OO.ui.MenuTagMultiselectWidget( {
	selected: [
		{
			data: 'foo',
			label: 'Nhãn của foo'
		},
		{
			data: 'bar',
			label: 'Nhãn của bar'
		}
	],
	options: [
		{
			data: 'foo',
			label: 'Nhãn của foo',
			icon: 'tag'
		},
		{
			data: 'bar',
			label: 'Nhãn của bar'
		},
		{
			data: 'baz',
			label: 'Nhãn của baz'
		},
		{
			data: 'quuz',
			label: 'Nhãn của quuz'
		},
		{
			data: 'red',
			label: 'Nhãn màu đỏ'
		},
		{
			data: 'green',
			label: 'Nhãn màu lục'
		},
		{
			data: 'blue',
			label: 'Nhãn màu lam'
		},
		{
			data: 'foo',
			label: 'Nhãn của foo'
		},
		{
			data: 'bar',
			label: 'Nhãn của bar'
		}
	],
	tagLimit: 5
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MenuTagMultiselectWidget
new OO.ui.MenuTagMultiselectWidget( {
	selected: [
		'foo',
		'bar',
		'Ngoài danh mục'
	],
	allowArbitrary: true,
	options: [
		{
			data: 'foo',
			label: 'Nhãn của foo',
			icon: 'tag'
		},
		{
			data: 'bar',
			label: 'Nhãn của bar'
		},
		{
			data: 'baz',
			label: 'Nhãn của baz'
		},
		{
			data: 'quz',
			label: 'Nhãn của quz'
		},
		{
			data: 'red',
			label: 'Nhãn màu đỏ'
		},
		{
			data: 'green',
			label: 'Nhãn màu lục'
		},
		{
			data: 'blue',
			label: 'Nhãn màu lam'
		},
		{
			data: 'foo',
			label: 'foo'
		},
		{
			data: 'bar',
			label: 'bar'
		},
		{
			data: 'Ngoài danh mục',
			label: 'Ngoài danh mục'
		}
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MenuTagMultiselectWidget
new OO.ui.MenuTagMultiselectWidget( {
	allowArbitrary: false,
	options: [
		{
			data: 'abc',
			label: 'Nhãn cho abc'
		},
		{
			data: 'asd',
			label: 'Nhãn cho asd'
		},
		{
			data: 'jkl',
			label: 'Nhãn cho jkl'
		}
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MenuTagMultiselectWidget
new OO.ui.MenuTagMultiselectWidget( {
	allowArbitrary: false,
	menu: {
		highlightOnFilter: true
	},
	options: [
		{
			data: 'abc',
			label: 'Mục abc'
		},
		{
			data: 'asd',
			label: 'Mục asd'
		},
		{
			data: 'jkl',
			label: 'Mục jkl'
		},
		{
			data: 'jkl2',
			label: 'Mục jkl thứ hai'
		},
		{
			data: 'jkl3',
			label: 'Mục jkl thứ ba'
		}
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MenuTagMultiselectWidget
new OO.ui.MenuTagMultiselectWidget( {
	inputPosition: 'outline',
	allowArbitrary: false,
	options: [
		{
			data: 'abc',
			label: 'Nhãn cho abc'
		},
		{
			data: 'asd',
			label: 'Nhãn cho asd'
		},
		{
			data: 'jkl',
			label: 'Nhãn cho jkl'
		}
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MenuTagMultiselectWidget
new OO.ui.MenuTagMultiselectWidget( {
	inputPosition: 'outline',
	selected: [
		'abc',
		'asd'
	],
	disabled: true,
	allowArbitrary: true,
	options: [
		{
			data: 'abc',
			label: 'Nhãn cho abc'
		},
		{
			data: 'asd',
			label: 'Nhãn cho asd'
		},
		{
			data: 'jkl',
			label: 'Nhãn cho jkl'
		}
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MenuTagMultiselectWidget
new OO.ui.MenuTagMultiselectWidget( {
	inputPosition: 'outline',
	allowArbitrary: false,
	verticalPosition: 'below',
	options: [
		{
			data: 1,
			label: 'Nhãn mục số 1'
		},
		{
			data: 2,
			label: 'Nhãn mục số 2'
		},
		{
			data: 3,
			label: 'Nhãn mục số 3'
		},
		{
			data: 4,
			label: 'Nhãn mục số 4'
		},
		{
			data: 5,
			label: 'Nhãn mục số 5'
		},
		{
			data: 6,
			label: 'Nhãn mục số 6'
		},
		{
			data: 7,
			label: 'Nhãn mục số 7'
		},
		{
			data: 8,
			label: 'Nhãn mục số 8'
		},
		{
			data: 9,
			label: 'Nhãn mục số 9'
		},
		{
			data: 10,
			label: 'Nhãn mục số 10'
		},
		{
			data: 11,
			label: 'Nhãn mục số 11'
		},
		{
			data: 12,
			label: 'Nhãn mục số 12'
		},
		{
			data: 13,
			label: 'Nhãn mục số 13'
		},
		{
			data: 14,
			label: 'Nhãn mục số 14'
		},
		{
			data: 15,
			label: 'Nhãn mục số 15'
		},
		{
			data: 16,
			label: 'Nhãn mục số 16'
		},
		{
			data: 17,
			label: 'Nhãn mục số 17'
		},
		{
			data: 18,
			label: 'Nhãn mục số 18'
		},
		{
			data: 19,
			label: 'Nhãn mục số 19'
		},
		{
			data: 20,
			label: 'Nhãn mục số 20'
		},
		{
			data: 21,
			label: 'Nhãn mục số 21'
		},
		{
			data: 22,
			label: 'Nhãn mục số 22'
		},
		{
			data: 23,
			label: 'Nhãn mục số 23'
		},
		{
			data: 24,
			label: 'Nhãn mục số 24'
		},
		{
			data: 25,
			label: 'Nhãn mục số 25'
		},
		{
			data: 26,
			label: 'Nhãn mục số 26'
		},
		{
			data: 27,
			label: 'Nhãn mục số 27'
		},
		{
			data: 28,
			label: 'Nhãn mục số 28'
		},
		{
			data: 29,
			label: 'Nhãn mục số 29'
		},
		{
			data: 30,
			label: 'Nhãn mục số 30'
		},
		{
			data: 31,
			label: 'Nhãn mục số 31'
		},
		{
			data: 32,
			label: 'Nhãn mục số 32'
		},
		{
			data: 33,
			label: 'Nhãn mục số 33'
		},
		{
			data: 34,
			label: 'Nhãn mục số 34'
		},
		{
			data: 35,
			label: 'Nhãn mục số 35'
		},
		{
			data: 36,
			label: 'Nhãn mục số 36'
		},
		{
			data: 37,
			label: 'Nhãn mục số 37'
		},
		{
			data: 38,
			label: 'Nhãn mục số 38'
		},
		{
			data: 39,
			label: 'Nhãn mục số 39'
		},
		{
			data: 40,
			label: 'Nhãn mục số 40'
		},
		{
			data: 41,
			label: 'Nhãn mục số 41'
		},
		{
			data: 42,
			label: 'Nhãn mục số 42'
		},
		{
			data: 43,
			label: 'Nhãn mục số 43'
		},
		{
			data: 44,
			label: 'Nhãn mục số 44'
		},
		{
			data: 45,
			label: 'Nhãn mục số 45'
		},
		{
			data: 46,
			label: 'Nhãn mục số 46'
		},
		{
			data: 47,
			label: 'Nhãn mục số 47'
		},
		{
			data: 48,
			label: 'Nhãn mục số 48'
		},
		{
			data: 49,
			label: 'Nhãn mục số 49'
		},
		{
			data: 50,
			label: 'Nhãn mục số 50'
		}
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MenuTagMultiselectWidget
new OO.ui.MenuTagMultiselectWidget( {
	inputPosition: 'inline',
	disabled: true,
	options: [
		{
			data: 'abc',
			label: 'Nhãn cho abc'
		},
		{
			data: 'asd',
			label: 'Nhãn cho asd'
		},
		{
			data: 'jkl',
			label: 'Nhãn cho jkl'
		}
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonMenuSelectWidget
new OO.ui.ButtonMenuSelectWidget( {
	icon: 'menu',
	label: 'Tùy chọn',
	menu: {
		items: [
			new OO.ui.MenuOptionWidget( {
				data: 'a',
				label: 'Mục thứ nhất'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'b',
				label: 'Mục thứ hai',
				indicator: 'required'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'c',
				label: 'Mục thứ ba'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'c',
				label: 'Mục chọn thứ tư có nhãn văn bản rất dài để kiểm thử tràn dòng'
			} ),
			new OO.ui.MenuOptionWidget( {
				icon: 'feedback',
				data: 'd',
				label: 'Mục chọn thứ năm có biểu tượng đi kèm'
			} )
		]
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonMenuSelectWidget
new OO.ui.ButtonMenuSelectWidget( {
	icon: 'menu',
	label: 'Tùy chọn',
	clearOnSelect: false,
	menu: {
		horizontalPosition: 'end',
		items: [
			new OO.ui.MenuOptionWidget( {
				data: 'a',
				label: 'Mục thứ nhất'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'b',
				label: 'Mục thứ hai',
				indicator: 'required'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'c',
				label: 'Mục thứ ba'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'c',
				label: 'Mục chọn thứ tư có nhãn văn bản rất dài để kiểm thử tràn dòng'
			} ),
			new OO.ui.MenuOptionWidget( {
				icon: 'feedback',
				data: 'd',
				label: 'Mục chọn thứ năm có biểu tượng đi kèm'
			} )
		]
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonMenuSelectWidget
new OO.ui.ButtonMenuSelectWidget( {
	icon: 'ellipsis',
	label: 'Thêm tùy chọn',
	invisibleLabel: true,
	framed: false,
	title: 'Thêm tùy chọn',
	menu: {
		items: [
			new OO.ui.MenuOptionWidget( {
				data: 'a',
				label: 'Mục thứ nhất'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'b',
				label: 'Mục thứ hai',
				indicator: 'required'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'c',
				label: 'Mục thứ ba'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'c',
				label: 'Mục chọn thứ tư có nhãn văn bản rất dài để kiểm thử tràn dòng'
			} ),
			new OO.ui.MenuOptionWidget( {
				icon: 'feedback',
				data: 'd',
				label: 'Mục chọn thứ năm có biểu tượng đi kèm'
			} )
		]
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.PopupButtonWidget
new OO.ui.PopupButtonWidget( {
	icon: 'info',
	framed: false,
	label: 'Thông tin chi tiết',
	invisibleLabel: true,
	popup: {
		head: true,
		icon: 'infoFilled',
		label: 'Thông tin chi tiết',
		$content: $( '<p>Nội dung hộp bật lên (Popup) hiển thị thông tin bổ sung hoặc hướng dẫn nhanh cho người dùng trên giao diện wiki.\u200e</p>' ),
		padded: true,
		align: 'force-left',
		autoFlip: false
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.PopupButtonWidget
new OO.ui.PopupButtonWidget( {
	icon: 'info',
	framed: false,
	label: 'Thông tin chi tiết',
	invisibleLabel: true,
	popup: {
		head: true,
		label: 'Thông tin chi tiết',
		$content: $( '<p>Nội dung hộp bật lên (Popup) hiển thị thông tin bổ sung hoặc hướng dẫn nhanh cho người dùng trên giao diện wiki.\u200e</p>' ),
		padded: true,
		align: 'force-right',
		hideCloseButton: true,
		autoFlip: false
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.PopupButtonWidget
new OO.ui.PopupButtonWidget( {
	icon: 'info',
	framed: false,
	label: 'Thông tin chi tiết',
	invisibleLabel: true,
	popup: {
		head: true,
		label: 'Thông tin chi tiết',
		$content: $( '<p>Nội dung hộp bật lên (Popup) hiển thị thông tin bổ sung hoặc hướng dẫn nhanh cho người dùng trên giao diện wiki.\u200e</p>' ),
		padded: true,
		align: 'backwards',
		autoFlip: false
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.PopupButtonWidget
new OO.ui.PopupButtonWidget( {
	icon: 'info',
	framed: false,
	label: 'Thông tin chi tiết',
	invisibleLabel: true,
	popup: {
		head: true,
		label: 'Thông tin chi tiết',
		$content: $( '<p>Nội dung hộp bật lên (Popup) hiển thị thông tin bổ sung hoặc hướng dẫn nhanh cho người dùng trên giao diện wiki.\u200e</p>' ),
		padded: true,
		align: 'forwards',
		autoFlip: false
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.PopupButtonWidget
new OO.ui.PopupButtonWidget( {
	icon: 'info',
	framed: false,
	label: 'Thông tin chi tiết',
	invisibleLabel: true,
	popup: {
		head: true,
		label: 'Thông tin chi tiết',
		$content: $( '<p>Nội dung hộp bật lên (Popup) hiển thị thông tin bổ sung hoặc hướng dẫn nhanh cho người dùng trên giao diện wiki.\u200e</p>' ),
		padded: true,
		align: 'center',
		autoFlip: false
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.PopupButtonWidget
new OO.ui.PopupButtonWidget( {
	icon: 'info',
	framed: false,
	label: 'Thông tin chi tiết',
	invisibleLabel: true,
	popup: {
		head: true,
		label: 'Thông tin chi tiết',
		$content: $( '<p>Nội dung hộp bật lên (Popup) hiển thị thông tin bổ sung hoặc hướng dẫn nhanh cho người dùng trên giao diện wiki.\u200e</p>' ),
		$footer: $( '<p>Và cả phần chân hộp bật lên (footer) ở ngay bên dưới.</p>' ),
		padded: true,
		align: 'forwards',
		autoFlip: false
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.PopupButtonWidget
new OO.ui.PopupButtonWidget( {
	icon: 'menu',
	label: 'Tùy chọn',
	popup: {
		$content: $( '<p>Nội dung hộp bật lên (Popup) hiển thị thông tin bổ sung hoặc hướng dẫn nhanh cho người dùng trên giao diện wiki.\u200e</p>' ),
		padded: true,
		align: 'forwards',
		autoFlip: false
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.PopupButtonWidget
new OO.ui.PopupButtonWidget( {
	icon: 'menu',
	label: 'Tùy chọn',
	popup: {
		$content: $( '<p>Nội dung hộp bật lên (Popup) hiển thị thông tin bổ sung hoặc hướng dẫn nhanh cho người dùng trên giao diện wiki.\u200e</p>' ),
		padded: true,
		align: 'backwards',
		autoFlip: false
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.PopupButtonWidget
new OO.ui.PopupButtonWidget( {
	icon: 'menu',
	label: 'Tùy chọn',
	popup: {
		$content: $( '<p>Nội dung hộp bật lên (Popup) hiển thị thông tin bổ sung hoặc hướng dẫn nhanh cho người dùng trên giao diện wiki.\u200e</p>' ),
		padded: true,
		align: 'center',
		autoFlip: false
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.PopupButtonWidget
new OO.ui.PopupButtonWidget( {
	icon: 'menu',
	label: 'Tùy chọn',
	popup: {
		$content: $( '<p>Nội dung hộp bật lên (Popup) hiển thị thông tin bổ sung hoặc hướng dẫn nhanh cho người dùng trên giao diện wiki.\u200e</p>' ),
		padded: true,
		align: 'center',
		position: 'above',
		autoFlip: false
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.PopupButtonWidget
new OO.ui.PopupButtonWidget( {
	icon: 'menu',
	label: 'Tùy chọn',
	popup: {
		$content: $( '<p>Nội dung hộp bật lên (Popup) hiển thị thông tin bổ sung hoặc hướng dẫn nhanh cho người dùng trên giao diện wiki.\u200e</p>' ),
		padded: true,
		align: 'center',
		position: 'before',
		autoFlip: false
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.PopupButtonWidget
new OO.ui.PopupButtonWidget( {
	icon: 'menu',
	label: 'Tùy chọn',
	popup: {
		$content: $( '<p>Nội dung hộp bật lên (Popup) hiển thị thông tin bổ sung hoặc hướng dẫn nhanh cho người dùng trên giao diện wiki.\u200e</p>' ),
		padded: true,
		align: 'center',
		position: 'after',
		autoFlip: false
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.PopupButtonWidget
new OO.ui.PopupButtonWidget( {
	icon: 'menu',
	label: 'Tùy chọn',
	popup: {
		$content: $( '<p>Nội dung hộp bật lên (Popup) hiển thị thông tin bổ sung hoặc hướng dẫn nhanh cho người dùng trên giao diện wiki.\u200e</p>' ),
		padded: true,
		anchor: false,
		align: 'center',
		autoFlip: false
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.PopupButtonWidget
new OO.ui.PopupButtonWidget( {
	icon: 'menu',
	label: 'Tùy chọn',
	popup: {
		$content: $( '<p>Nội dung hộp bật lên (Popup) hiển thị thông tin bổ sung hoặc hướng dẫn nhanh cho người dùng trên giao diện wiki.\u200e</p>' ),
		padded: true,
		anchor: false,
		align: 'forwards',
		autoFlip: false
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.PopupButtonWidget
new OO.ui.PopupButtonWidget( {
	icon: 'menu',
	label: 'Tùy chọn',
	popup: {
		$content: $( '<p>Nội dung hộp bật lên (Popup) hiển thị thông tin bổ sung hoặc hướng dẫn nhanh cho người dùng trên giao diện wiki.\u200e</p>' ),
		padded: true,
		anchor: false,
		align: 'backwards',
		autoFlip: false
	}
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ProgressBarWidget
new OO.ui.ProgressBarWidget( {
	progress: 33
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ProgressBarWidget
new OO.ui.ProgressBarWidget( {
	progress: 50,
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ProgressBarWidget
new OO.ui.ProgressBarWidget( {
	progress: false
} ));

// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ProgressBarWidget
let widget=new OO.ui.ProgressBarWidget( {
	progress: 75
} );widget.pushPending();widgetsList.push(widget);

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.IconWidget
new OO.ui.IconWidget( {
	icon: 'search',
	label: 'Tìm kiếm',
	title: 'Biểu tượng tìm kiếm'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.IconWidget
new OO.ui.IconWidget( {
	icon: 'trash',
	label: 'Thùng rác',
	title: 'Biểu tượng xóa',
	flags: 'destructive'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.IconWidget
new OO.ui.IconWidget( {
	icon: 'search',
	label: 'Tìm kiếm',
	title: 'Biểu tượng tìm kiếm',
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.IndicatorWidget
new OO.ui.IndicatorWidget( {
	indicator: 'required',
	label: 'Bắt buộc',
	title: 'Chỉ báo trường bắt buộc'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.IndicatorWidget
new OO.ui.IndicatorWidget( {
	indicator: 'required',
	label: 'Bắt buộc',
	title: 'Chỉ báo trường bắt buộc',
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.LabelWidget
new OO.ui.LabelWidget( {
	label: 'Nhãn văn bản'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.LabelWidget
new OO.ui.LabelWidget( {
	label: 'Nhãn văn bản',
	disabled: true
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.LabelWidget
new OO.ui.LabelWidget( {
	label: new OO.ui.HtmlSnippet( 'Định dạng <b>chữ đậm</b>, <i>in nghiêng</i> và <u>gạch chân</u>!' )
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.LabelWidget
new OO.ui.LabelWidget( {
	label: 'Nhãn liên kết với ô nhập văn bản bên dưới',
	input: new OO.ui.TextInputWidget( {
		value: 'Ô nhập của nhãn phía trên'
	} )
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.TextInputWidget( {
	value: 'Ô nhập của nhãn phía trên'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.LabelWidget
new OO.ui.LabelWidget( {
	label: 'Nhãn liên kết với nhóm nút chọn (Radio) bên dưới',
	input: new OO.ui.RadioSelectInputWidget( {
		options: [
			{
				data: 'a',
				label: 'Lựa chọn của nhãn phía trên'
			},
			{
				data: 'b',
				label: 'Lựa chọn của nhãn phía trên'
			}
		]
	} )
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.RadioSelectInputWidget
new OO.ui.RadioSelectInputWidget( {
	options: [
		{
			data: 'a',
			label: 'Lựa chọn của nhãn phía trên'
		},
		{
			data: 'b',
			label: 'Lựa chọn của nhãn phía trên'
		}
	]
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MessageWidget
new OO.ui.MessageWidget( {
	type: 'notice',
	label: new OO.ui.HtmlSnippet( '<strong>Hộp thông báo (Notice) dành cho người dùng.</strong><br>Hỗ trợ hiển thị thông tin trên nhiều dòng.' )
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MessageWidget
new OO.ui.MessageWidget( {
	type: 'notice',
	inline: true,
	label: new OO.ui.HtmlSnippet( 'Thông báo nội dòng (Inline Notice) dành cho người dùng.<br>Hỗ trợ hiển thị trên nhiều dòng.' )
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MessageWidget
new OO.ui.MessageWidget( {
	type: 'error',
	label: 'Hộp báo lỗi (Error) hiển thị thông điệp cảnh báo lỗi chi tiết cho người dùng.'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MessageWidget
new OO.ui.MessageWidget( {
	type: 'error',
	inline: true,
	label: 'Thông báo lỗi nội dòng (Inline Error) dành cho người dùng.'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MessageWidget
new OO.ui.MessageWidget( {
	type: 'warning',
	label: 'Hộp cảnh báo (Warning) nhắc người dùng lưu ý trước khi thực hiện.'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MessageWidget
new OO.ui.MessageWidget( {
	type: 'warning',
	inline: true,
	label: 'Cảnh báo nội dòng (Inline Warning) dành cho người dùng.'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MessageWidget
new OO.ui.MessageWidget( {
	type: 'success',
	label: 'Hộp thông báo thành công (Success) xác nhận thao tác đã hoàn tất.'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MessageWidget
new OO.ui.MessageWidget( {
	type: 'success',
	inline: true,
	label: 'Thông báo thành công nội dòng (Inline Success) dành cho người dùng.'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MessageWidget
new OO.ui.MessageWidget( {
	type: 'notice',
	icon: 'article',
	label: 'Hộp thông báo (Notice) với biểu tượng bài viết tùy chỉnh.'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MessageWidget
new OO.ui.MessageWidget( {
	type: 'success',
	icon: 'article',
	label: 'Hộp thông báo thành công (Success) với biểu tượng tùy chỉnh.'
} ));

widgetsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MessageWidget
new OO.ui.MessageWidget( {
	type: 'notice',
	label: 'Hộp thông báo có nút đóng (nhấn × để ẩn).',
	showClose: true
} ));

	return widgetsList;
}

function layouts() {
	const layoutsList = [];

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.FieldLayout( new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	align: 'top',
	label: 'FieldLayout có nút trợ giúp bật lên',
	help: 'Đoạn văn bản mẫu dài trong Học Sinh Chân Kinh dùng để kiểm tra hiển thị khi nội dung vượt quá một dòng.\u200e'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.FieldLayout( new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	align: 'top',
	helpInline: true,
	label: 'FieldLayout có dòng trợ giúp hiển thị sẵn',
	help: 'Đây là dòng trợ giúp hiển thị trực tiếp bên dưới trường, cung cấp thông tin phụ trợ cho người dùng.'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.FieldLayout( new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	align: 'top',
	label: 'FieldLayout có trợ giúp định dạng HTML',
	help: new OO.ui.HtmlSnippet( '<b>Chữ in đậm</b> giúp nhấn mạnh nội dung hướng dẫn!' )
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.FieldLayout( new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	align: 'top',
	helpInline: true,
	label: 'FieldLayout có trợ giúp nội dòng định dạng HTML',
	help: new OO.ui.HtmlSnippet( '<b>Chữ in đậm</b> rất hữu ích! Chỉ nên dùng cho văn bản hướng dẫn bổ trợ.' )
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.FieldLayout( new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	align: 'top',
	label: 'FieldLayout có chú thích nổi (title)',
	title: 'Chú thích nổi của trường'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.FieldLayout( new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	align: 'top',
	label: $( '<i>FieldLayout có nhãn in nghiêng</i>' )
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ActionFieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ActionFieldLayout( new OO.ui.TextInputWidget(), new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	align: 'top',
	label: 'ActionFieldLayout căn nhãn phía trên (top)'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.FieldLayout( new OO.ui.TextInputWidget(), {
	align: 'top',
	label: 'FieldLayout căn nhãn phía trên kèm trợ giúp',
	help: 'Đoạn văn bản mẫu dài trong Học Sinh Chân Kinh dùng để kiểm tra hiển thị khi nội dung vượt quá một dòng.\u200e'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.FieldLayout( new OO.ui.TextInputWidget(), {
	align: 'top',
	helpInline: true,
	label: 'FieldLayout căn nhãn phía trên kèm trợ giúp nội dòng',
	help: 'Đây là dòng trợ giúp hiển thị trực tiếp bên dưới trường, cung cấp thông tin phụ trợ cho người dùng.'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ActionFieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ActionFieldLayout( new OO.ui.TextInputWidget(), new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	align: 'top',
	label: 'ActionFieldLayout căn nhãn phía trên kèm trợ giúp',
	help: 'Đoạn văn bản mẫu dài trong Học Sinh Chân Kinh dùng để kiểm tra hiển thị khi nội dung vượt quá một dòng.\u200e'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ActionFieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.CheckboxInputWidget
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ActionFieldLayout( new OO.ui.CheckboxInputWidget( {
	selected: true
} ), new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	align: 'inline',
	label: 'ActionFieldLayout căn trên cùng một dòng (inline)'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.CheckboxInputWidget
new OO.ui.FieldLayout( new OO.ui.CheckboxInputWidget( {
	selected: true
} ), {
	align: 'inline',
	label: 'FieldLayout căn nội dòng kèm trợ giúp',
	help: 'Đoạn văn bản mẫu dài trong Học Sinh Chân Kinh dùng để kiểm tra hiển thị khi nội dung vượt quá một dòng.\u200e'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.CheckboxInputWidget
new OO.ui.FieldLayout( new OO.ui.CheckboxInputWidget( {
	selected: true
} ), {
	align: 'inline',
	label: 'FieldLayout căn nội dòng với ChuỗiNhãnDàiKhôngKhoảngTrắngGiốngTênTrangMediaWikiĐểKiểmThửTrànDòng',
	help: 'Đoạn văn bản mẫu dài trong Học Sinh Chân Kinh dùng để kiểm tra hiển thị khi nội dung vượt quá một dòng.\u200e'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ActionFieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.CheckboxInputWidget
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ActionFieldLayout( new OO.ui.CheckboxInputWidget( {
	selected: true
} ), new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	align: 'inline',
	label: 'ActionFieldLayout căn nội dòng kèm trợ giúp',
	help: 'Đoạn văn bản mẫu dài trong Học Sinh Chân Kinh dùng để kiểm tra hiển thị khi nội dung vượt quá một dòng.\u200e'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ActionFieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ActionFieldLayout( new OO.ui.TextInputWidget(), new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	label: 'ActionFieldLayout căn nhãn bên trái (left)'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.FieldLayout( new OO.ui.TextInputWidget(), {
	label: 'FieldLayout căn nhãn bên trái kèm trợ giúp',
	help: 'Đoạn văn bản mẫu dài trong Học Sinh Chân Kinh dùng để kiểm tra hiển thị khi nội dung vượt quá một dòng.\u200e'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.FieldLayout( new OO.ui.TextInputWidget(), {
	helpInline: true,
	label: 'FieldLayout căn nhãn bên trái, trợ giúp nội dòng',
	help: 'Dòng hướng dẫn phụ trợ hiển thị trực tiếp bên dưới.'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ActionFieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ActionFieldLayout( new OO.ui.TextInputWidget(), new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	label: 'ActionFieldLayout căn nhãn bên trái kèm trợ giúp',
	help: 'Đoạn văn bản mẫu dài trong Học Sinh Chân Kinh dùng để kiểm tra hiển thị khi nội dung vượt quá một dòng.\u200e'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ActionFieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.DropdownInputWidget
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ActionFieldLayout( new OO.ui.DropdownInputWidget( {
	label: 'Chọn một mục',
	options: [
		{
			data: 'a',
			label: 'Mục thứ nhất'
		},
		{
			data: 'b',
			label: 'Mục thứ hai'
		},
		{
			data: 'c',
			label: 'Mục thứ ba'
		}
	],
	value: 'b'
} ), new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	helpInline: true,
	label: 'ActionFieldLayout căn trái với DropdownInputWidget',
	help: 'Dòng hướng dẫn phụ trợ hiển thị trực tiếp bên dưới.'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ActionFieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.DropdownWidget
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ActionFieldLayout( new OO.ui.DropdownWidget( {
	label: 'Chọn một mục',
	menu: {
		items: [
			new OO.ui.MenuOptionWidget( {
				data: 'a',
				label: 'Mục thứ nhất'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'b',
				label: 'Mục thứ hai'
			} ),
			new OO.ui.MenuOptionWidget( {
				data: 'c',
				label: 'Mục thứ ba'
			} )
		]
	},
	value: 'b'
} ), new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	helpInline: true,
	label: 'ActionFieldLayout căn trái với DropdownWidget',
	help: 'Dòng hướng dẫn phụ trợ hiển thị trực tiếp bên dưới.'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ActionFieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.MenuTagMultiselectWidget
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ActionFieldLayout( new OO.ui.MenuTagMultiselectWidget( {
	selected: [
		{
			data: 'foo',
			label: 'Nhãn của foo'
		},
		{
			data: 'bar',
			label: 'Nhãn của bar'
		}
	],
	options: [
		{
			data: 'foo',
			label: 'Nhãn của foo',
			icon: 'tag'
		},
		{
			data: 'bar',
			label: 'Nhãn của bar'
		},
		{
			data: 'baz',
			label: 'Nhãn của baz'
		},
		{
			data: 'foo',
			label: 'Nhãn của foo'
		},
		{
			data: 'bar',
			label: 'Nhãn của bar'
		}
	]
} ), new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	label: 'ActionFieldLayout căn trái với MenuTagMultiselectWidget'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ActionFieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ActionFieldLayout( new OO.ui.TextInputWidget(), new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	align: 'right',
	label: 'ActionFieldLayout căn nhãn bên phải (right)'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.FieldLayout( new OO.ui.TextInputWidget(), {
	align: 'right',
	label: 'FieldLayout căn nhãn bên phải kèm trợ giúp',
	help: 'Đoạn văn bản mẫu dài trong Học Sinh Chân Kinh dùng để kiểm tra hiển thị khi nội dung vượt quá một dòng.\u200e'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.FieldLayout( new OO.ui.TextInputWidget(), {
	align: 'right',
	helpInline: true,
	label: 'FieldLayout căn nhãn bên phải, trợ giúp nội dòng',
	help: 'Dòng hướng dẫn phụ trợ hiển thị trực tiếp bên dưới.'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ActionFieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.ButtonWidget
new OO.ui.ActionFieldLayout( new OO.ui.TextInputWidget(), new OO.ui.ButtonWidget( {
	label: 'Nút bấm'
} ), {
	align: 'right',
	label: 'ActionFieldLayout căn nhãn bên phải kèm trợ giúp',
	help: 'Đoạn văn bản mẫu dài trong Học Sinh Chân Kinh dùng để kiểm tra hiển thị khi nội dung vượt quá một dòng.\u200e'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.FieldLayout( new OO.ui.TextInputWidget(), {
	align: 'top',
	label: 'FieldLayout căn trên với nhãn rất dài để kiểm tra bố cục khi nhãn tự xuống nhiều dòng trên màn hình hẹp.\u200e',
	help: 'Đoạn văn bản mẫu dài trong Học Sinh Chân Kinh dùng để kiểm tra hiển thị khi nội dung vượt quá một dòng.\u200e'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.CheckboxInputWidget
new OO.ui.FieldLayout( new OO.ui.CheckboxInputWidget( {
	selected: true
} ), {
	align: 'inline',
	label: 'FieldLayout căn nội dòng với nhãn rất dài để kiểm tra bố cục khi nhãn tự xuống nhiều dòng.\u200e',
	help: 'Đoạn văn bản mẫu dài trong Học Sinh Chân Kinh dùng để kiểm tra hiển thị khi nội dung vượt quá một dòng.\u200e'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.FieldLayout( new OO.ui.TextInputWidget(), {
	label: 'FieldLayout căn trái với nhãn rất dài để kiểm tra tỉ lệ cột nhãn và cột ô nhập.\u200e',
	help: 'Đoạn văn bản mẫu dài trong Học Sinh Chân Kinh dùng để kiểm tra hiển thị khi nội dung vượt quá một dòng.\u200e'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.FieldLayout( new OO.ui.TextInputWidget(), {
	align: 'right',
	label: 'FieldLayout căn phải với nhãn rất dài để kiểm tra tỉ lệ cột nhãn và cột ô nhập.\u200e',
	help: 'Đoạn văn bản mẫu dài trong Học Sinh Chân Kinh dùng để kiểm tra hiển thị khi nội dung vượt quá một dòng.\u200e'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.FieldLayout( new OO.ui.TextInputWidget(), {
	align: 'right',
	helpInline: true,
	label: 'FieldLayout căn phải với nhãn rất dài kèm dòng trợ giúp nội dòng bên dưới.\u200e',
	help: 'Dòng hướng dẫn phụ trợ hiển thị trực tiếp bên dưới.'
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.FieldLayout( new OO.ui.TextInputWidget( {
	value: ''
} ), {
	align: 'top',
	label: 'FieldLayout kèm thông báo (notice)',
	notices: [
		'Vui lòng nhập một chữ số.'
	]
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.FieldLayout( new OO.ui.TextInputWidget( {
	value: 'Foo'
} ), {
	align: 'top',
	label: 'FieldLayout kèm thông báo lỗi (error)',
	errors: [
		'Giá trị bắt buộc phải là chữ số. Bạn không thể tiếp tục nếu chưa nhập một số hợp lệ vào trường này.'
	]
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.FieldLayout( new OO.ui.TextInputWidget( {
	value: 'Foo'
} ), {
	align: 'top',
	label: 'FieldLayout kèm đủ 4 trạng thái: lỗi, cảnh báo, thành công và thông báo',
	errors: [
		'Giá trị bắt buộc phải là một số.'
	],
	warnings: [
		'Giá trị nên là một chữ số.'
	],
	successMessages: [
		'Giá trị hợp lệ. Chúc mừng bạn!'
	],
	notices: [
		'Vui lòng nhập một chữ số.'
	]
} ));

layoutsList.push(// See documentation at:
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.FieldLayout
// https://doc.wikimedia.org/oojs-ui/master/js/#!/api/OO.ui.TextInputWidget
new OO.ui.FieldLayout( new OO.ui.TextInputWidget( {
	validate: function ( value ) {
				return value.length % 2 === 0;
			}
} ), {
	align: 'top',
	label: 'FieldLayout tự kiểm tra hợp lệ khi gõ (validation)',
	help: 'Chỉ hợp lệ khi nhập số lượng ký tự chẵn'
} ));

// https://gerrit.wikimedia.org/r/plugins/gitiles/oojs/ui/+/master/demos/pages/layouts.js
var loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, ' +
'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
function DemoPageLayout( name, config ) {
    DemoPageLayout.super.call( this, name, config );
}
OO.inheritClass( DemoPageLayout, OO.ui.PageLayout );
DemoPageLayout.prototype.setupOutlineItem = function () {
    this.outlineItem.setLabel( this.getName() );
};
var pages = [
	new DemoPageLayout( 'first', {
		expanded: false,
		label: 'Một',
		content: [
			$( '<p>' ).text( 'Nội dung trang Một trong BookletLayout.' )
		]
	} ),
	new DemoPageLayout( 'second', {
		expanded: false,
		label: 'Hai',
		content: [
			$( '<p>' ).text( 'Nội dung trang Hai trong BookletLayout.' )
		]
	} ),
	new DemoPageLayout( 'third', {
		expanded: false,
		label: 'Ba',
		content: [
			$( '<p>' ).text( 'Nội dung trang Ba trong BookletLayout.' )
		]
	} ),
	new DemoPageLayout( 'fourth', {
		expanded: false,
		label: 'Bốn',
		content: [
			$( '<p>' ).text( 'Nội dung trang Bốn trong BookletLayout.' )
		]
	} ),
	new DemoPageLayout( 'long', {
		expanded: false,
		label: 'Nội dung dài',
		content: [
			$( '<p>' ).text( loremIpsum ),
			$( '<p>' ).text( loremIpsum ),
			$( '<p>' ).text( loremIpsum ),
			$( '<p>' ).text( loremIpsum ),
			$( '<p>' ).text( loremIpsum ),
			$( '<p>' ).text( loremIpsum ),
			$( '<p>' ).text( loremIpsum )
		]
	} )
];
layoutsList.push(
new OO.ui.FieldLayout(
	new OO.ui.Widget( {
		content: [
			new OO.ui.PanelLayout( {
				expanded: false,
				framed: true,
				content: [
					new OO.ui.BookletLayout( {
						expanded: false,
						outlined: true
					} ).addPages( pages )
				]
			} )
		]
	} ),
	{
		label: 'Sổ tay có mục lục bên cạnh (Outlined BookletLayout)',
		align: 'top'
	}
)
);

// https://gerrit.wikimedia.org/r/plugins/gitiles/oojs/ui/+/master/demos/pages/layouts.js
var loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, ' +
'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
layoutsList.push(
new OO.ui.FieldLayout(
	new OO.ui.Widget( {
		content: [
			new OO.ui.PanelLayout( {
				expanded: false,
				framed: true,
				content: [
					new OO.ui.IndexLayout( {
						expanded: false
					} ).addTabPanels( [
						new OO.ui.TabPanelLayout( 'first', {
							expanded: false,
							label: 'Thẻ 1',
							content: [
								$( '<p>' ).text( 'Nội dung của Thẻ 1.' )
							]
						} ),
						new OO.ui.TabPanelLayout( 'second', {
							expanded: false,
							label: 'Thẻ 2',
							content: [
								$( '<p>' ).text( 'Nội dung của Thẻ 2.' )
							]
						} ),
						new OO.ui.TabPanelLayout( 'third', {
							expanded: false,
							label: 'Thẻ 3',
							content: [
								$( '<p>' ).text( 'Nội dung của Thẻ 3.' )
							]
						} ),
						new OO.ui.TabPanelLayout( 'fourth', {
							expanded: false,
							label: 'Thẻ 4',
							content: [
								$( '<p>' ).text( 'Nội dung của Thẻ 4.' )
							]
						} ),
						new OO.ui.TabPanelLayout( 'long', {
							expanded: false,
							label: 'Thẻ dài',
							content: [
								$( '<p>' ).text( loremIpsum ),
								$( '<p>' ).text( loremIpsum ),
								$( '<p>' ).text( loremIpsum )
							]
						} )
					] )
				]
			} )
		]
	} ),
	{
		label: 'Bố cục thẻ ngang có viền (IndexLayout · framed)',
		align: 'top'
	}
)
);

// https://gerrit.wikimedia.org/r/plugins/gitiles/oojs/ui/+/master/demos/pages/layouts.js
var loremIpsum = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, ' +
'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
layoutsList.push(
new OO.ui.FieldLayout(
	new OO.ui.Widget( {
		content: [
			new OO.ui.PanelLayout( {
				expanded: false,
				framed: false,
				content: [
					new OO.ui.IndexLayout( {
						expanded: false,
						framed: false
					} ).addTabPanels( [
						new OO.ui.TabPanelLayout( 'first', {
							expanded: false,
							label: 'Thẻ 1'
						} ),
						new OO.ui.TabPanelLayout( 'second', {
							expanded: false,
							label: 'Thẻ 2'
						} ),
						new OO.ui.TabPanelLayout( 'third', {
							expanded: false,
							label: 'Thẻ 3'
						} ),
						new OO.ui.TabPanelLayout( 'fourth', {
							expanded: false,
							label: 'Thẻ 4'
						} ),
						new OO.ui.TabPanelLayout( 'long', {
							expanded: false,
							label: 'Thẻ dài (có liên kết)',
							content: [
								$( '<p>' ).text( loremIpsum ),
								$( '<p>' ).text( loremIpsum ),
								$( '<p>' ).text( loremIpsum )
							],
							tabItemConfig: {
								href: '#exampleHref'
							}
						} )
					] )
				]
			} )
		]
	} ),
	{
		label: 'Bố cục thẻ ngang không viền (IndexLayout · frameless)',
		align: 'top'
	}
)
);

	return layoutsList;
}

function icons() {
	const iconsList = [];

let icons = [
	"arrowNext",
	"arrowPrevious",
	"collapse",
	"downTriangle",
	"draggable",
	"doubleChevronEnd",
	"doubleChevronStart",
	"expand",
	"move",
	"next",
	"previous",
	"last",
	"first",
	"upTriangle",
	"article",
	"articles",
	"articleAdd",
	"articleCheck",
	"articleDisambiguation",
	"articleNotFound",
	"articleSearch",
	"articlesSearch",
	"articleRedirect",
	"database",
	"die",
	"download",
	"folderPlaceholder",
	"history",
	"info",
	"infoFilled",
	"robot",
	"share",
	"specialPages",
	"tag",
	"upload",
	"window",
	"alert",
	"bell",
	"bellOutline",
	"error",
	"message",
	"notice",
	"speechBubble",
	"speechBubbleAdd",
	"speechBubbles",
	"tray",
	"add",
	"browser",
	"cancel",
	"check",
	"checkAll",
	"clear",
	"clock",
	"close",
	"ellipsis",
	"feedback",
	"funnel",
	"hand",
	"heart",
	"help",
	"helpNotice",
	"home",
	"key",
	"keyboard",
	"lightbulb",
	"logIn",
	"logOut",
	"network",
	"networkOff",
	"newWindow",
	"pageSettings",
	"printer",
	"reload",
	"search",
	"settings",
	"stopHand",
	"subtract",
	"bookmarkOutline",
	"bookmark",
	"block",
	"unBlock",
	"flag",
	"unFlag",
	"lock",
	"unLock",
	"restore",
	"star",
	"halfStar",
	"unStar",
	"trash",
	"pushPin",
	"ongoingConversation",
	"edit",
	"editLock",
	"editUndo",
	"link",
	"unLink",
	"linkExternal",
	"linkSecure",
	"redo",
	"undo",
	"bigger",
	"smaller",
	"subscript",
	"superscript",
	"bold",
	"highlight",
	"italic",
	"strikethrough",
	"underline",
	"textLanguage",
	"textDirLTR",
	"textDirRTL",
	"textStyle",
	"indent",
	"listBullet",
	"listNumbered",
	"outdent",
	"alignCenter",
	"alignLeft",
	"alignRight",
	"attachment",
	"calendar",
	"code",
	"hieroglyph",
	"imageLayoutBasic",
	"imageLayoutFrame",
	"imageLayoutFrameless",
	"imageLayoutThumbnail",
	"labFlask",
	"language",
	"layout",
	"markup",
	"mathematics",
	"mathematicsDisplayBlock",
	"mathematicsDisplayDefault",
	"mathematicsDisplayInline",
	"newline",
	"noWikiText",
	"ocr",
	"outline",
	"puzzle",
	"quotes",
	"sandbox",
	"searchCaseSensitive",
	"searchDiacritics",
	"searchRegularExpression",
	"signature",
	"specialCharacter",
	"table",
	"tableAddColumnAfter",
	"tableAddColumnBefore",
	"tableAddRowAfter",
	"tableAddRowBefore",
	"tableCaption",
	"tableMergeCells",
	"tableMoveColumnAfter",
	"tableMoveColumnBefore",
	"tableMoveRowAfter",
	"tableMoveRowBefore",
	"templateAdd",
	"translation",
	"wikiText",
	"book",
	"journal",
	"newspaper",
	"reference",
	"referenceExisting",
	"references",
	"camera",
	"chart",
	"exitFullscreen",
	"fullScreen",
	"image",
	"imageAdd",
	"imageBroken",
	"imageLock",
	"imageGallery",
	"musicalScore",
	"pause",
	"play",
	"stop",
	"volumeDown",
	"volumeOff",
	"volumeUp",
	"zoomIn",
	"zoomOut",
	"globe",
	"map",
	"mapPin",
	"mapPinAdd",
	"mapTrail",
	"userAdd",
	"userAnonymous",
	"userAvatar",
	"userAvatarOutline",
	"userContributions",
	"userGroup",
	"userTalk",
	"watchlist",
	"menu",
	"recentChanges",
	"textFlow",
	"textSummary",
	"viewCompact",
	"viewDetails",
	"bright",
	"halfBright",
	"notBright",
	"eye",
	"eyeClosed",
	"moon",
	"largerText",
	"smallerText",
	"visionSimulator",
	"logoCC",
	"logoWikidata",
	"logoWikimedia",
	"logoWikimediaCommons",
	"logoWikimediaDiscovery",
	"logoWikipedia"
];

	for (iconName of icons) {
		iconsList.push(
			new OO.ui.FieldLayout(
				new OO.ui.IconWidget({ icon: iconName }),
				{ label: iconName }
			)
		);
	}

	return iconsList;
}

function dialogs() {

	var fieldsets = [],
		windowManager = new OO.ui.WindowManager();

	function SimpleDialog( config ) {
		SimpleDialog.super.call( this, config );
	}
	OO.inheritClass( SimpleDialog, OO.ui.ProcessDialog );
	SimpleDialog.static.name = 'simple';
	SimpleDialog.static.title = 'Hộp thoại đơn giản';
	SimpleDialog.static.actions = [
		{ action: 'close', label: 'Đóng', flags: [ 'safe', 'close' ] },
		{ action: 'save', label: 'Lưu thay đổi', flags: [ 'primary', 'progressive' ] }
	];
	SimpleDialog.prototype.initialize = function () {
		SimpleDialog.super.prototype.initialize.apply( this, arguments );
		this.content = new OO.ui.PanelLayout( { padded: true, expanded: false } );
		this.content.$element.append(
			$( '<p>' ).text( 'Đây là nội dung bên trong hộp thoại thử nghiệm của Học Sinh Chân Kinh. Bạn có thể nhấn nút Đóng ở góc trên để thoát.' )
		);
		this.$body.append( this.content.$element );
	};
	SimpleDialog.prototype.getActionProcess = function ( action ) {
		var dialog = this;
		if ( action ) {
			return new OO.ui.Process( function () {
				dialog.close( { action: action } );
			} );
		}
		return SimpleDialog.super.prototype.getActionProcess.call( this, action );
	};

	var configs = [
		{
			name: 'Hàm hộp thoại nhanh (OO.ui.alert / confirm / prompt)',
			id: 'demo-section-functions',
			examples: [
				{
					name: 'Cảnh báo nhanh (alert)',
					method: 'alert',
					param: 'Nội dung thông báo nhanh.'
				},
				{
					name: 'Cảnh báo cỡ lớn (larger alert)',
					method: 'alert',
					param: 'Nội dung thông báo nhanh.',
					data: { size: 'larger' }
				},
				{
					name: 'Hộp xác nhận (confirm)',
					method: 'confirm',
					param: 'Bạn có chắc chắn muốn thực hiện thao tác này không?'
				},
				{
					name: 'Hộp nhập liệu nhanh (prompt)',
					method: 'prompt',
					param: 'Nhập nội dung của bạn:'
				}
			]
		},
		{
			name: 'Các mẫu hộp thoại chuẩn (OO.ui.Dialog & MessageDialog)',
			id: 'demo-section-dialog',
			examples: [
				{
					name: 'Hộp thoại đơn giản (nhỏ · small)',
					config: {
						size: 'small'
					}
				},
				{
					name: 'Hộp thoại đơn giản (vừa · medium)',
					config: {
						size: 'medium'
					}
				},
				{
					name: 'Hộp thoại đơn giản (lớn · large)',
					config: {
						size: 'large'
					}
				},
				{
					name: 'Hộp thoại đơn giản (rất lớn · larger)',
					config: {
						size: 'larger'
					}
				},
				{
					name: 'Hộp thoại toàn màn hình (full)',
					config: {
						size: 'full'
					}
				},
				{
					name: 'Hộp thoại thông điệp (cơ bản)',
					dialogClass: OO.ui.MessageDialog,
					data: {
						title: 'Tiếp tục thao tác?',
						message: 'Thao tác này có thể ảnh hưởng đến dữ liệu hiện tại.'
					}
				},
				{
					name: 'Hộp thoại thông điệp (nội dung dài)',
					dialogClass: OO.ui.MessageDialog,
					data: {
						title: 'Tiếp tục thao tác?',
						message: 'Đây là hộp thoại thông điệp có nội dung dài để kiểm tra khả năng cuộn và căn lề văn bản bên trong cửa sổ OO.ui.MessageDialog. Trong Học Sinh Chân Kinh, hộp thoại này có thể xuất hiện khi hệ thống hiển thị thông báo chi tiết, cảnh báo bảo vệ trang hoặc xác nhận thao tác hàng loạt trên cả giao diện máy tính (Vector) lẫn di động (Minerva).'
					}
				},
				{
					name: 'Hộp thoại thông điệp (1 nút hành động)',
					dialogClass: OO.ui.MessageDialog,
					data: {
						title: 'Đã chạm giới hạn lưu trữ',
						message: 'Không gian lưu trữ tạm thời đã đầy.',
						actions: [
							{
								action: 'accept',
								label: 'Đã hiểu',
								flags: 'primary'
							}
						]
					}
				},
				{
					name: 'Hộp thoại thông điệp (2 nút hành động)',
					dialogClass: OO.ui.MessageDialog,
					data: {
						title: 'Không thể lưu dữ liệu',
						message: 'Máy chủ hiện không phản hồi, vui lòng thử lại.',
						actions: [
							{
								action: 'reject',
								label: 'Hủy',
								flags: [ 'safe', 'close' ]
							},
							{
								action: 'repeat',
								label: 'Thử lại',
								flags: [ 'primary', 'progressive' ]
							}
						]
					}
				},
				{
					name: 'Hộp thoại thông điệp (2 nút dài)',
					dialogClass: OO.ui.MessageDialog,
					data: {
						title: 'Không thể lưu dữ liệu',
						message: 'Máy chủ hiện không phản hồi, vui lòng thử lại.',
						// These messages should be just long enough to trigger a vertical
						// layout but will probably vary by which font is used.
						actions: [
							{
								action: 'reject',
								label: 'Không thử lưu lại lần nữa',
								flags: [ 'safe', 'close' ]
							},
							{
								action: 'repeat',
								label: 'Thử lưu lại dữ liệu lần nữa',
								flags: [ 'primary', 'progressive' ]
							}
						]
					}
				},
				{
					name: 'Hộp thoại thông điệp (3 nút hành động)',
					dialogClass: OO.ui.MessageDialog,
					data: {
						title: 'Xóa tập tin này?',
						message: 'Tập tin sẽ bị xóa vĩnh viễn và không thể khôi phục. Hãy cân nhắc kỹ.',
						actions: [
							{ action: 'reject', label: 'Hủy', flags: [ 'safe', 'close' ] },
							{ action: 'reject', label: 'Chuyển vào thùng rác' },
							{
								action: 'accept',
								label: 'Xóa vĩnh viễn',
								flags: [ 'primary', 'destructive' ]
							}
						]
					}
				}
			]
		}
	];
	function openDialog( name, data, manager ) {
		manager.openWindow( name, data );
	}
	configs.forEach( function ( config, j ) {
		var fieldset = new OO.ui.FieldsetLayout( {
			label: config.name,
			id: config.id
		} );
		fieldsets.push( fieldset.$element );
		config.examples.forEach( function ( example, i ) {
			var openButton = new OO.ui.ButtonWidget( {
				framed: false,
				icon: 'window',
				label: $( '<span>' ).attr( 'dir', 'ltr' ).text( example.name )
			} );
			if ( example.method ) {
				openButton.on(
					'click', OO.ui.bind(
						OO.ui,
						example.method,
						example.param,
						example.data
					)
				);
			} else {
				var name = 'window_' + j + '_' + i;
				var DialogClass = example.dialogClass || SimpleDialog;
				var manager = example.windowManager || windowManager;
				var windows = {};
				windows[ name ] = new DialogClass( example.config );
				manager.addWindows( windows );
				openButton.on(
					'click', OO.ui.bind( openDialog, this, name, example.data, manager )
				);
			}
			fieldset.addItems( [ new OO.ui.FieldLayout( openButton, { align: 'inline' } ) ] );
		} );
	} );

	return fieldsets.concat( [ windowManager.$element ] );

}
