package com.Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.Random;

public class CashInPage extends HomePage{


    public CashInPage(WebDriver driver) {
        super(driver);
    }
    By BankTransferText = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div[1]/div/p");
    By BankTransfer = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div[1]/button");
    By CardTransfer = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div[2]/button");
    By RadioCard = By.id("radio-test");
    By ContinueCashIn = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div/div[2]/button");
    By CashInAmount =By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div/div[1]/div/input");
    By CashInRevision = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div/h4");


    public String BankTransferText(){
        if (isDisplayed(BankTransferText)){
            return getText(BankTransferText);
        }else{
            System.out.println("Locator 'BankTransferText' not found");
            return null;
        }
    }

    public String BankTransfer(){
        if (isDisplayed(BankTransfer)){
            click(BankTransfer);
            return null;
        }else{
            System.out.println("Locator 'BankTransfer' not found");
            return null;
        }
    }

    public String CardTransfer(){
        if (isDisplayed(CardTransfer)){
            click(CardTransfer);
            return null;
        }else{
            System.out.println("Locator 'CardTransfer' not found");
            return null;
        }
    }




    public String ContinueCashIn(){
        if (isDisplayed(ContinueCashIn)){
            click(ContinueCashIn);
            return null;
        }else{
            System.out.println("Locator 'ContinueCashIn' not found");
            return null;
        }
    }


    public boolean CashInAmountVisible(){
        if (isDisplayed(CashInAmount)){
            return true;
        }else{
            System.out.println("Locator 'CashInAmount' not found");
            return false;
        }
    }


    public String CashInAmountCard(){
        if (isDisplayed(CashInAmount)){
            type("2000", CashInAmount);
            return null;
        }else{
            System.out.println("Locator 'CashInAmount' not found");
            return null;
        }
    }

    public String CashInRevision(){
        if (isDisplayed(CashInRevision)){
            return getText(CashInRevision);
        }else{
            System.out.println("Locator 'CashInRevision' not found");
            return null;
        }
    }
    public String RadioCard(){
        if (isDisplayed(RadioCard)){
            click(RadioCard);
        }else{
            System.out.println("Locator 'Radio Card ' not found");
        }
        return null;
    }
}
