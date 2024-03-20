package com.Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import java.util.Random;

public class CardsPage extends HomePage{
    public CardsPage(WebDriver driver) {
        super(driver);
    }



    By NewCardButton = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div[1]/div/div/div/button");
    By NewcardArrow = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div[1]/div/div/button");
    By CardName = By.name("name");
    By CardNumber =By.name("number");
    By CardExpM = By.name("expiryMonth");
    By CardExpY = By.name("expiryYear");
    By CardCvc = By.name("cvc");
    By EndWith = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div[2]/div[2]/div/div/div/h6/text()[2]");
    By CardContinue = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/form/div[2]/div[5]/button");

    public String NewcardArrow(){
        if (isDisplayed(NewcardArrow)){
            click(NewcardArrow);
            return null;
        }else{
            System.out.println("Locator 'NewCardArrow' not found");
            return null;
        }
    }
    public String NewCardButton(){
        if (isDisplayed(NewCardButton)){
            click(NewCardButton);
            return null;
        }else{
            System.out.println("Locator 'NewCardButton' not found");
            return null;
        }
    }
    public String CardContinue(){
        if (isDisplayed(CardContinue)){
            click(CardContinue);
            return null;
        }else{
            System.out.println("Locator 'CardContinue' not found");
            return null;
        }
    }
    public String EndWith(){
        if (isDisplayed(EndWith)){
            return getText(EndWith);
        }else{
            System.out.println("Locator 'EndWith' not found");
            return null;
        }
    }
    public void FillNewCard() throws InterruptedException{
        Random random = new Random();
        int N = random.nextInt(10000);
        Thread.sleep(500);

        if( isDisplayed(CardContinue)){
            type("4444567843218901", CardNumber);
            Thread.sleep(500);
            type("Amancio Rosas", CardName);
            Thread.sleep(500);
            type("11", CardExpM);
            type("26", CardExpY);
            Thread.sleep(500);
            type("678", CardCvc);


        }else {
            System.out.println("New credit card not found");
        }

    }

}
