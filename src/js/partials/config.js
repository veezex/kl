var config = {
  mapLinks: "../js/test.json", //точки на карте
  mapBaloon: "images/map__baloon.png", //метка на карте

  izbrannoeTemplateList: "izbrannoe_list.html", //ссылка на шаблон для избранного (лист)
  izbrannoeTemplateCard: "izbrannoe_list.html", //ссылка на шаблон для избранного (карточки)

  sellTemplateSell: "form-sell.html", //ссылка на шаблон формы продажи/аренды в модальном окне
  consultTemplate: "form-consult.html", //ссылка на шаблон формы консультации в модальном окне
  otzyvTemplate: "form-otzyv.html", //ссылка на шаблон формы отзыва в модальном окне
  egrnTemplate: "form-egrn.html", //ссылка на шаблон модального окна егрн

  formOtzyv: "../js/test-otzyv.json", //ссылка на скрипт для формы отправки отзыва
  formConsult: "../js/test-consult.json", //ссылка на скрипт для формы отправки запроса на консультацию
  formSell: "../js/test-consult.json", //ссылка на скрипт для формы отправки продажи/аренды
  
  empName: "modal-", //ссылка на скрипт для формы сотрудников

  formHelpYes: "./subtheme_yes.html", //страница спасибо для блока Юридическая помощь
  formHelpForm: "./subtheme_form.html", //страница формы для блока Юридическая помощь 
  
  themesList: "./js/theme.json", //ссылка на json со списком тем для Юридическая помощь 
  themeLink: "subtheme", //будет указан в data-attr для передачи id подтемы, формирует ссылку типа themeLink + id темы, тут можно написать article.php?id=
  subthemeList: "./js/", //ссылка на json со списком подтем, формирует ссылку типа subthemeList + link + '.json', link берется из переменной выше - themeLink
  subthemeLink: "subtheme", //будет указан в data-attr для передачи id контента подтемы, формирует ссылку типа subthemeLink + id подтемы, тут можно написать article.php?id=
  subthemeContent: "./", //ссылка на html c контентом подтемы, формирует ссылку  subthemeContent + link + '.html', link берется из переменной выше - subthemeLink
}