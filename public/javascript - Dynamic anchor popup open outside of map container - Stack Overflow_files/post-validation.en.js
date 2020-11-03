StackExchange.postValidation=function(){function e(e,t,n){var r={"Title":".js-post-title-field","Body":".js-post-body-field[data-post-type-id="+t+"]","Tags":".js-post-tags-field","Mentions":".js-post-mentions-field","EditComment":".js-post-edit-comment-field","Excerpt":".js-post-excerpt-field","Email":".js-post-email-field","ArticleType":".js-article-type-field"};return r[n]?e.find(r[n]):$()}function t(t,n,r){var o=e(t,n,r);return r===L||r===q?t.find(".js-tag-editor").filter(function(){return $(this).data("target-field")===o.get(0)}):o}function n(e,t,n,r){var o=e.find('input[type="submit"]:visible, button[type="submit"]:visible'),i=o.length&&o.is(":enabled");i&&o.prop("disabled",!0),u(e,t,n),l(e,t,n,r),f(e,t,n),h(e,t,n),g(e,t,n),w(e,t,function(){d(e,t,n),i&&o.prop("disabled",!1)})}function r(r,s,c,u,l){n(r,s,c,u);var d,f=function(e){if(r.trigger("post:submit-completed",[{"formType":c,"postTypeId":s,"response":e}]),e.success)if(l)l(e);else{var t=window.location.href.split("#")[0],n=e.redirectTo.split("#")[0];0===n.indexOf("/")&&(n=window.location.protocol+"//"+window.location.hostname+n),d=!0,window.location=e.redirectTo,t.toLowerCase()===n.toLowerCase()&&window.location.reload(!0)}else e.captchaHtml?StackExchange.nocaptcha.init(e.captchaHtml,f):e.errors?(r.find(".js-post-prior-attempt-count").val(function(e,t){return(+t+1||0).toString()}),k(r,s,c,e.errors,e.warnings)):b(r,s,c,{"General":[$("<span/>").text(e.message).html()]},0)};r.submit(function(){if(r.find(".js-post-answer-while-asking-checkbox").is(":checked"))return!0;if(p(r,s,c))return StackExchange.helpers.enableSubmitButton(r),!1;if(a(),StackExchange.navPrevention&&StackExchange.navPrevention.stop(),r.find('input[type="submit"]:visible, button[type="submit"]').addClass("is-loading"),StackExchange.helpers.disableSubmitButton(r),StackExchange.options.site.enableNewTagCreationWarning){var n=e(r,s,L),u=n.prop("defaultValue");if(n.val()!==u)return $.ajax({"type":"GET","url":"/posts/new-tags-warning","dataType":"json","data":{"tags":n.val()},"success":function(e){if(e.showWarning){var n={"closeOthers":!0,"shown":function(){$(".js-confirm-tag-creation").on("click",function(e){return StackExchange.helpers.closePopups(),i(r,s,c,d,f),e.preventDefault(),!1})},"dismissing":function(){o(r,d)},"returnElements":t(r,s,L).find("input:visible")};StackExchange.helpers.showModal($(e.html).elementNodesOnly(),n),StackExchange.helpers.bindMovablePopups()}else i(r,s,c,d,f)}}),!1}return setTimeout(function(){i(r,s,c,d,f)},0),!1})}function o(e,t){e.find('input[type="submit"]:visible, button[type="submit"]').removeClass("is-loading"),t||StackExchange.helpers.enableSubmitButton(e)}function i(e,t,n,r,i){$.ajax({"type":"POST","dataType":"json","data":e.serialize(),"url":e.attr("action"),"success":i,"error":function(){var r=v(n,0);b(e,t,n,{"General":[$("<span/>").text(r).html()]},0)},"complete":function(){o(e,r)}})}function a(){for(var e=0;e<G.length;e++)clearTimeout(G[e]);G=[]}function s(t,n,r,o,i){e(t,n,o).blur(function(){var e=this,a=$(this),s=function(e){C(t,n,r,o,e)},c=function(e){return x(e,t,n,r,[o])};G.push(setTimeout(function(){var t=StackExchange.stacksValidation.handlerFor(a);t&&!P&&t.clear(),i.call(e,a,s,c)},V))})}function c(t,n,r,o,i){if(1===n)return x({"type":"POST","url":"/posts/validate-question","data":{"title":e(t,n,D).val(),"body":e(t,n,M).val(),"tags":e(t,n,L).val(),"fkey":StackExchange.options.user.fkey}},t,n,r,[D,M,L],i).promise();if(2===n)return x({"type":"POST","url":"/posts/validate-body","data":{"body":e(t,n,M).val(),"oldBody":e(t,n,M).prop("defaultValue"),"isQuestion":!1,"isSuggestedEdit":o||!1,"fkey":StackExchange.options.user.fkey}},t,n,r,[M],i).promise();var a=$.Deferred();return a.reject(),a.promise()}function u(e,t,n){s(e,t,n,D,function(e,t,n){var r=e.val(),o=$.trim(r).length,i=e.data("min-length"),a=e.data("max-length");return 0!==o||P?i&&i>o?(t(function(e){return 1==e.minLength?"Title must be at least "+e.minLength+" character.":"Title must be at least "+e.minLength+" characters."}({"minLength":i})),void 0):a&&o>a?(t(function(e){return 1==e.maxLength?"Title cannot be longer than "+e.maxLength+" character.":"Title cannot be longer than "+e.maxLength+" characters."}({"maxLength":a})),void 0):(n({"type":"POST","url":"/posts/validate-title","data":{"title":r,"fkey":StackExchange.options.user.fkey}}),void 0):(t(),void 0)})}function l(e,t,n,r){s(e,t,n,M,function(e,n,o){var i=e.val(),a=$.trim(i).length,s=e.data("min-length");return 0!==a||P?5===t?(s&&s>a?n(function(e){return"Wiki Body must be at least "+e.minLength+" characters. You entered "+e.actual+"."}({"minLength":s,"actual":a})):n(),void 0):((1===t||2===t)&&o({"type":"POST","url":"/posts/validate-body","data":{"body":i,"oldBody":e.prop("defaultValue"),"isQuestion":1===t,"isSuggestedEdit":r,"fkey":StackExchange.options.user.fkey}}),void 0):(n(),void 0)})}function d(e,t,n){s(e,t,n,L,function(e,t,n){var r=e.val(),o=$.trim(r).length;return 0!==o||P?(n({"type":"POST","url":"/posts/validate-tags","data":{"tags":r,"oldTags":e.prop("defaultValue"),"fkey":StackExchange.options.user.fkey},"success":function(t){var n=e.closest(".js-post-form").find(".js-warned-tags-field");if(n.length){var r=n.val(),o=n.data("warned-tags")||[],i=((t.source||{}).Tags||[]).filter(function(e){return e&&-1===o.indexOf(e)});i.length>0&&StackExchange.using("gps",function(){i.forEach(function(e){StackExchange.gps.track("tag_warning.show",{"tag":e},!0),r+=" "+e,o.push(e)}),n.val($.trim(r)).data("warned-tags",o),StackExchange.gps.sendPending()})}}}),void 0):(t(),void 0)})}function p(t,n,r){return"[Edit removed during grace period]"===$.trim(e(t,n,F).val())?(C(t,n,r,F,"Comment reserved for system use. Please use an appropriate comment."),!0):!1}function f(e,t,n){s(e,t,n,F,function(r,o){var i=r.val(),a=$.trim(i).length,s=r.data("min-length"),c=r.data("max-length");return 0===a?(o(),void 0):s&&s>a?(o(function(e){return 1==e.minLength?"Your edit summary must be at least "+e.minLength+" character.":"Your edit summary must be at least "+e.minLength+" characters."}({"minLength":s})),void 0):c&&a>c?(o(function(e){return 1==e.maxLength?"Your edit summary cannot be longer than "+e.maxLength+" character.":"Your edit summary cannot be longer than "+e.maxLength+" characters."}({"maxLength":c})),void 0):(p(e,t,n)||o(),void 0)})}function h(e,t,n){s(e,t,n,R,function(e,t){var n=e.val(),r=$.trim(n).length,o=e.data("min-length"),i=e.data("max-length");return 0===r?(t(),void 0):o&&o>r?(t(function(e){return"Wiki Excerpt must be at least "+e.minLength+" characters; you entered "+e.actual+"."}({"minLength":o,"actual":r})),void 0):i&&r>i?(t(function(e){return"Wiki Excerpt cannot be longer than "+e.maxLength+" characters; you entered "+e.actual+"."}({"maxLength":i,"actual":r})),void 0):(t(),void 0)})}function g(e,t,n){s(e,t,n,B,function(e,t){var n=e.val(),r=$.trim(n),o=r.length;return 0===o?(t(),void 0):StackExchange.helpers.isEmailAddress(r)?(t(),void 0):(t("This email does not appear to be valid."),void 0)})}function m(e,t){var n=$("#sidebar, .sidebar").first().width()||270,r="lg"===StackExchange.responsive.currentRange();return e===N?{"position":"inline","css":{"display":"inline-block","margin-bottom":"10px"},"closeOthers":!1,"dismissable":!1,"type":t}:{"position":{"my":r?"left top":"top center","at":r?"right center":"bottom center"},"css":{"max-width":n,"min-width":n},"closeOthers":!1,"type":t}}function v(e,t){if(t>0)switch(e){case"question":return function(e){return 1==e.specificErrorCount?"Your question couldn't be submitted. Please see the error above.":"Your question couldn't be submitted. Please see the errors above."}({"specificErrorCount":t});case"answer":return function(e){return 1==e.specificErrorCount?"Your answer couldn't be submitted. Please see the error above.":"Your answer couldn't be submitted. Please see the errors above."}({"specificErrorCount":t});case"edit":return function(e){return 1==e.specificErrorCount?"Your edit couldn't be submitted. Please see the error above.":"Your edit couldn't be submitted. Please see the errors above."}({"specificErrorCount":t});case"tags":return function(e){return 1==e.specificErrorCount?"Your tags couldn't be submitted. Please see the error above.":"Your tags couldn't be submitted. Please see the errors above."}({"specificErrorCount":t});case"article":return function(e){return 1==e.specificErrorCount,"Your article couldn't be submitted. Please see the errors above."}({"specificErrorCount":t});default:return function(e){return 1==e.specificErrorCount?"Your post couldn't be submitted. Please see the error above.":"Your post couldn't be submitted. Please see the errors above."}({"specificErrorCount":t})}else switch(e){case"question":return"An error occurred submitting the question.";case"answer":return"An error occurred submitting the answer.";case"edit":return"An error occurred submitting the edit.";case"tags":return"An error occurred submitting the tags.";case"article":return"An error occurred submitting the article.";default:return"An error occurred submitting the post."}}function b(e,t,n,r,o){var i=e.find(".js-general-error").text("").removeClass("d-none");if(!E(e,i,r,null,N,t,n))return o>0?(i.text(v(n,o)),void 0):(i.addClass("d-none"),void 0)}function y(e){var t=$(".js-post-review-summary").closest(".js-post-review-summary-container");if(t.length>0)return t.filter(":visible").scrollIntoView(),void 0;var n;A()&&($("#sidebar").animate({"opacity":.4},500),n=setInterval(function(){A()||($("#sidebar").animate({"opacity":1},500),clearInterval(n))},500));var r;e.find(".validation-error, .js-stacks-validation.has-error").each(function(){var e=$(this).offset().top;(!r||r>e)&&(r=e)});var o=function(){for(var t=0;3>t;t++)e.find(".message").animate({"left":"+=5px"},100).animate({"left":"-=5px"},100)};if(r){var i=$(".review-bar").length;r=Math.max(0,r-(i?125:30)),$("html, body").animate({"scrollTop":r},o)}else o()}function k(e,t,n,r,o){r&&w(e,t,function(){var i=S(e,t,n,[D,M,L,q,F,R,B,U],r,o).length;b(e,t,n,r,i),y(e)})}function w(e,n,r){var o=function(){1!==n||t(e,n,L).length?r():setTimeout(o,250)};o()}function x(e,t,n,r,o,i){return $.ajax(e).then(function(e){return i?$.when(i()).then(function(){return e}):e}).done(function(e){S(t,n,r,o,e.errors,e.warnings)}).fail(function(){S(t,n,r,o,{},{})})}function S(e,n,r,o,i,a){for(var s=[],c=0;c<o.length;c++){var u=o[c];E(e,t(e,n,u),i,a,u,n,r)&&s.push(u)}return s}function C(e,n,r,o,i){j(e,t(e,n,o),i?[$("<span/>").text(i).html()]:[],[],o,n,r)}function E(e,t,n,r,o,i,a){var s=n[o]||[],c=(r||{})[o]||[];return j(e,t,s,c,o,i,a)}function j(e,t,n,r,o,i,a){var s=StackExchange.stacksValidation.handlerFor(t);return s?_(s,i,a,n,r,o):T(t,o,n),e.find(".validation-error, .js-stacks-validation.has-error").length||e.find(".js-general-error").text(""),t.trigger("post:validated-field",[{"errors":n,"warnings":r,"field":o,"postTypeId":i,"formType":a}]),n.length>0}function _(e,t,n,r,o){e.clear("error"),r.forEach(function(t){e.add("error",t)}),"edit"===n||"question"===n&&P||(e.clear("warning"),o.forEach(function(t){e.add("warning",t)}))}function T(e,t,n){e&&e.length&&(0===n.length||1===n.length&&""===n[0]||!$("html").has(e).length?O(e):I(e,n,m(t,"error")))}function I(e,t,n){var r=1===t.length?t[0]:"<ul><li>"+t.join("</li><li>")+"</li></ul>",o=e.data("error-popup");if(o&&o.is(":visible")){var i=e.data("error-message");if(i===r)return o.animateOffsetTop&&o.animateOffsetTop(0),void 0;o.fadeOutAndRemove()}var s=StackExchange.helpers.showMessage(e,r,n);s.find("a").attr("target","_blank"),s.click(a),e.addClass("validation-error").data("error-popup",s).data("error-message",r)}function O(e){var t=e.data("error-popup");t&&t.is(":visible")&&t.fadeOutAndRemove(),e.removeClass("validation-error"),e.removeData("error-popup"),e.removeData("error-message")}function A(){var e=!1,t=$("#sidebar, .sidebar").first();if(!t.length)return!1;var n=t.offset().left;return $(".message").each(function(){var t=$(this);return t.offset().left+t.outerWidth()>n?(e=!0,!1):void 0}),e}var P=$("body").hasClass("js-ask-page-v2"),D="Title",M="Body",L="Tags",q="Mentions",F="EditComment",R="Excerpt",B="Email",N="General",U="ArticleType",G=[],V=250;return{"initOnBlur":n,"initOnBlurAndSubmit":r,"showErrorsAfterSubmission":k,"validatePostFields":c,"scrollToErrors":y}}();