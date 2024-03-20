package com.Pages;

import com.Base.BasePage;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

public class LandingPage extends BasePage{

    public LandingPage(WebDriver driver) {
        super(driver);
    }


    By LoginBtn =  By.xpath("//*[@id=\"__next\"]/div/header/div/div[2]/div/div[1]/button");
    By RegisterBtn = By.xpath("//*[@id=\"__next\"]/div/header/div/div[2]/div/div[2]/button");

    By HPText = By.xpath("//*[@id=\"__next\"]/div/div[1]/div/div[1]/div[1]/h1");


    public String landingText(){
        if (isDisplayed(HPText)){
            return getText(HPText);
        }else{
            System.out.println("Locator 'landingText' not found");
            return null;
        }
    }
    public void register() throws InterruptedException {
        Thread.sleep(500);
        click(RegisterBtn);
    }

    public void login() throws InterruptedException {
        Thread.sleep(500);
        click(LoginBtn);
    }




}
