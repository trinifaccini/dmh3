package com.Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import java.util.Random;

public class LoginPage extends LandingPage {



    public LoginPage(WebDriver driver) {
        super(driver);
    }

    By ContinueBtn =  By.xpath("//*[@id=\"__next\"]/div/div[1]/div/div/div/form/div/div[3]/div/div[1]/button");

    By RegisterLoginBtn = By.xpath("//*[@id=\"__next\"]/div/div[1]/div/div/div/form/div/div[3]/div/div[2]/button");

    By loginText = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/div/form/div/div[1]/h4");

    By EmailTextBox = By.name("email");
    By PassTextBox = By.name("password");

    public String loginText(){
        if (isDisplayed(loginText)){
            return getText(loginText);
        }else{
            System.out.println("Locator 'loginText' not found");
            return null;
        }
    }
    public void Create() throws InterruptedException {
        Thread.sleep(500);
        click(RegisterLoginBtn);
    }

    public void Continue() throws InterruptedException {
        Thread.sleep(500);
        click(ContinueBtn);
    }

    public void LoginUser() throws InterruptedException{

        Thread.sleep(500);
        if( isDisplayed(loginText)){
            type("amancio@rosas.com", EmailTextBox);
            Thread.sleep(500);
            click(ContinueBtn);
            Thread.sleep(4000);
            type("Amancio1234!", PassTextBox);
            Thread.sleep(500);
            click(ContinueBtn);
            Thread.sleep(1500);

        }else {
            System.out.println("Register page was not found");
        }

    }

    public void RegisterUserLogin() throws InterruptedException{


        if( isDisplayed(loginText)){
            click(RegisterLoginBtn);
            Thread.sleep(500);
        }else {
            System.out.println("Register page was not found");
        }

    }



}
