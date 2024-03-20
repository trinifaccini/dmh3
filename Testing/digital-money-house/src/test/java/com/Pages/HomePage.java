package com.Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class HomePage extends RegisterPage {


    public HomePage(WebDriver driver) {
        super(driver);
    }

    By Amount = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div[1]/div[2]/h1");
    By Start = By.xpath(     "//*[@id=\"__next\"]/div/div[1]/div[1]/div/div/div/ul/li[1]/div/div/span");
    By Activities = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/div/div/ul/li[2]/div/div/span");
    By Profile = By.xpath(   "//*[@id=\"__next\"]/div/div[1]/div[1]/div/div/div/ul/li[3]/div/div/span");
    By CashIn = By.xpath(    "//*[@id=\"__next\"]/div/div[1]/div[1]/div/div/div/ul/li[4]/div/div/span");
    By Payouts = By.xpath(   "//*[@id=\"__next\"]/div/div[1]/div[1]/div/div/div/ul/li[5]/div/div/span");
    By Cards = By.xpath(     "//*[@id=\"__next\"]/div/div[1]/div[1]/div/div/div/ul/li[6]/div/div/span");
    By CloseSession = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/div/div/ul/li[7]/div/div/span");
    By ProfileButton = By.xpath("//*[@id=\"__next\"]/div/header/div/div[2]/button");
    By HideEye = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div[1]/div[2]/div/svg/path");

    By ProfileName = By.xpath("//*[@id=\"__next\"]/div/header/div/div[2]/p");
    By GeneralAmount = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div[1]/div[2]/h1");


    public String Profilebutton(){
        if (isDisplayed(ProfileButton)){
            click(ProfileButton);
            return null;
        }else{
            System.out.println("Locator 'ProfileButton' not found");
            return null;
        }
    }
    public String HideEye(){
        if (isDisplayed(HideEye)){
            click(HideEye);
            return null;
        }else{
            System.out.println("Locator 'HideEye' not found");
            return null;
        }
    }


    public String homeText(){

        if (isDisplayed(Start)){
            return getText(Start);
        }else{
            System.out.println("Locator 'Start' not found");
            return null;
        }
    }

    public String Activities(){
        if (isDisplayed(Activities)){
            click(Activities);
            return null;
        }else{
            System.out.println("Locator 'ProfileButton' not found");
            return null;
        }
    }
    public String Profile(){
        if (isDisplayed(Profile)){
            click(Profile);
            return null;
        }else{
            System.out.println("Locator 'Profile' not found");
            return null;
        }
    }


    public String CashIn(){
        if (isDisplayed(CashIn)){
            click(CashIn);
            return null;
        }else{
            System.out.println("Locator 'CashIn' not found");
            return null;
        }
    }


    public String CardsButton(){
        if (isDisplayed(Cards)){
            click(Cards);
            return null;
        }else{
            System.out.println("Locator 'Cards' not found");
            return null;
        }
    }
    public String LogOut(){
        if (isDisplayed(CloseSession)){
            click(CloseSession);
            return null;
        }else{
            System.out.println("Locator 'CloseSession' not found");
            return null;
        }
    }

    public String amount(){
        if (isDisplayed(Amount)){
            return getText(Amount);
        }else{
            System.out.println("Locator 'Amount' not found");
            return null;
        }
    }






}
