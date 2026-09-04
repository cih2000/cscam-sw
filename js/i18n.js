// SW 사이트 i18n
(function(){
  var params = new URLSearchParams(location.search);
  var lang = params.get('lang') || 'ko';
  window.LANG = lang;
  document.documentElement.lang = (lang === 'en' || lang === 'zh') ? lang : (lang === 'jp' ? 'ja' : 'ko');

  window.t = function(ko, en, zh, jp){ return window.LANG === 'en' ? (en || ko) : window.LANG === 'zh' ? (zh || en || ko) : window.LANG === 'jp' ? (jp || en || ko) : ko; };

  document.addEventListener('DOMContentLoaded', function(){
    // data-i18n-text 속성 처리
    document.querySelectorAll('[data-i18n-text]').forEach(function(el){
      try {
        var translations = JSON.parse(el.getAttribute('data-i18n-text'));
        el.textContent = translations[window.LANG] || translations['ko'];
      } catch(e){}
    });
    // data-i18n-html 속성 처리 (값은 개발자가 HTML에 직접 작성한 신뢰된 정적 문자열만 사용)
    document.querySelectorAll('[data-i18n-html]').forEach(function(el){
      try {
        var translations = JSON.parse(el.getAttribute('data-i18n-html'));
        // NOTE: only developer-authored static strings are placed in data-i18n-html attributes.
        // No user input ever reaches this path.
        el.innerHTML = translations[window.LANG] || translations['ko'];
      } catch(e){}
    });
    // data-i18n-attr 속성 처리
    document.querySelectorAll('[data-i18n-attr]').forEach(function(el){
      try {
        var attrs = JSON.parse(el.getAttribute('data-i18n-attr'));
        Object.keys(attrs).forEach(function(attrName){
          var translations = attrs[attrName];
          el.setAttribute(attrName, translations[window.LANG] || translations['ko']);
        });
      } catch(e){}
    });
    // 언어 버튼 활성 상태
    document.querySelectorAll('.lang-btn').forEach(function(btn){
      if(btn.dataset.lang === window.LANG){
        btn.style.color = '#1c3464';
        btn.style.fontWeight = '700';
      } else {
        btn.style.color = '#9ab';
        btn.style.fontWeight = '400';
      }
    });
  });
})();
