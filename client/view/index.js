/**
 * Created by danielbruce on 2017-06-23.
 */

IndexView = function() {

}

IndexView.prototype.initialize = function(){
    this.highlightFiatButton();
    this.populateCurrencyList();
}

IndexView.prototype.highlightFiatButton = function(){
    $(".donateFiatButton").css("background-color", "#ff3838");
    $(".donateCryptoButton").css("background-color", "#ffffff");
}

IndexView.prototype.highlightCryptoButton = function(){
    $(".donateFiatButton").css("background-color", "#ffffff");
    $(".donateCryptoButton").css("background-color", "#ff3838");
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
        $(".currencySelectionListWrapper").removeClass("cssHidden");
    } else {
        $(".currencySelectionListWrapper").addClass("cssHidden");
    }
}

IndexView.prototype.populateCurrencyList = function(){
    $(".currencySelectorList").empty();
    currencyList = this.getCurrencyDict();
    currencyListKeys = Object.keys(currencyList);
    for(var i = 0; i < currencyListKeys.length;i++) {
        element = "<div class='currencyElement cssCurrencyElement'><label>" + currencyList[currencyListKeys[i]] + "</label></div>"
        $(".currencySelectorList").append(element);
    }

}