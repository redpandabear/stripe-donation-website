/**
 * Created by danielbruce on 2017-06-23.
 */

IndexView = function() {
    this._selectedCurrency = "";
}

IndexView.prototype.initialize = function(){
    this.highlightFiatButton();
    this.populateCurrencyList();
    this._selectedCurrency = this.getInverseFromCurrencyDict($(".currencySelectionBox label").text());
}

IndexView.prototype.getInverseFromCurrencyDict = function(target){
    currencyDict = this.getCurrencyDict();
    currencyDictKeys = Object.keys(currencyDict);
    for (var i = 0; i < currencyDictKeys.length; i++){
        if (currencyDict[currencyDictKeys[i]] === target){
            return currencyDictKeys[i];
        }
    }
    return -1;
}

IndexView.prototype.highlightFiatButton = function(){
    $(".donateFiatButton").css("background-color", "#ffffff");
    $(".donateCryptoButton").css("background-color","#ff3838" );
}

IndexView.prototype.highlightCryptoButton = function(){
    $(".donateFiatButton").css("background-color", "#ff3838");
    $(".donateCryptoButton").css("background-color","#ffffff" );
}

IndexView.prototype.showCryptoDonationPanel = function(){
    $(".fiatDonationPanel").hide();
    $(".cryptoDonationPanel").show();
}

IndexView.prototype.showFiatDonationPanel = function(){
    $(".fiatDonationPanel").show();
    $(".cryptoDonationPanel").hide();
}

IndexView.prototype.getCurrencyDict = function(){
    // key : display format
    return {
        "cad": "CAD",
        "eur": "EUR",
        "gbp": "GBP",
        "usd": "USD",
    }
}

IndexView.prototype.toggleDisplayCurrencyList = function(){
    if ($(".currencySelectionListWrapper").hasClass("cssHidden")) {
        this.showCurrencyList();
    } else {
        this.hideCurrencyList();
    }
}

IndexView.prototype.hideCurrencyList = function(){
    $(".currencySelectionListWrapper").addClass("cssHidden");
}

IndexView.prototype.showCurrencyList = function(){
    $(".currencySelectionListWrapper").removeClass("cssHidden");
}

IndexView.prototype.populateCurrencyList = function(){
    $(".currencySelectorList").empty();
    currencyList = this.getCurrencyDict();
    currencyListKeys = Object.keys(currencyList);
    for(var i = 0; i < currencyListKeys.length;i++) {
        element = "<div class='currencyElement cssCurrencyElement' controllerClickFunction='selectCurrency' value='"+currencyListKeys[i]+"'>" +
            "<label>" + currencyList[currencyListKeys[i]] + "</label></div>";
        $(".currencySelectorList").append(element);
    }
}

IndexView.prototype.setSelectedCurrency = function(newCurrency) {
    this._selectedCurrency = newCurrency;
}

IndexView.prototype.getSelectedCurrency = function(){
    return this._selectedCurrency;
}

IndexView.prototype.addCurrencyToStripeHandler = function(currency){
    handler["currency"] = g_IndexView.getSelectedCurrency();
    requestStripeToken();
}