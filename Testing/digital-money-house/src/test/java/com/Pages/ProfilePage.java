package com.Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;

import java.util.Random;

public class ProfilePage extends HomePage{


    public ProfilePage(WebDriver driver) {
        super(driver);
    }
    By YourData = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div[1]/h4");
    By Name = By.xpath("");
    By EditName = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div/button");
    By EditableName = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div/div[1]/input");
    By ConfirmEditName = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div/div[2]/button[2]");
    By ConfirmAll = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div[1]/div[2]/div/div[2]/button");

    public String EditNameButton(){
        if (isDisplayed(EditName)){
            click(EditName);
            return null;
        }else{
            System.out.println("Locator 'EditName' not found");
            return null;
        }
    }


    public String YourData(){
        if (isDisplayed(YourData)){
            return getText(YourData);
        }else{
            System.out.println("Locator 'YourData' not found");
            return null;
        }
    }

    public void  EditName() throws InterruptedException{
        Random random = new Random();
        int N = random.nextInt(1000);
        Thread.sleep(500);
        if( isDisplayed(EditableName)){
            WebElement editable = driver.findElement(EditableName);
            String s = Keys.chord(Keys.CONTROL, "a");
            editable.sendKeys(s);
            editable.sendKeys(Keys.DELETE);
            type("Amancio"+N, EditableName);
            Thread.sleep(500);

            click(ConfirmEditName);
            Thread.sleep(1000);
            click(ConfirmAll);
        }else {
            System.out.println("Register page 'EditName' was not found");
        }

    }








}
