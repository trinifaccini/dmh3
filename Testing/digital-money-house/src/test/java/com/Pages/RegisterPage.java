package com.Pages;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;

import java.util.Random;

public class RegisterPage extends LoginPage {
    public RegisterPage(WebDriver driver) {

        super(driver);
    }

    By SignUpTitle = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/form/div[1]");
    By  Name = By.name("firstName");

    By  Lastname =By.name("lastName");
    By  Dni = By.name("dni");
    By  Email = By.name("email");
    By  Phone = By.name("phone");
    By  Pass = By.name("password");
    By  RePass = By.name("repassword");
    By  CreateAccount = By.xpath("//*[@id=\"__next\"]/div/div[1]/div/div/form/div[2]/div[9]/button");
    By Created = By.xpath("//*[@id=\"rightPanel\"]/p");

    By LastUser = By.xpath("//*[@id=\"rightPanel\"]/h1");



    public String RegisterText(){
        if (isDisplayed(SignUpTitle)){
            return getText(SignUpTitle);
        }else{
            System.out.println("Locator 'RegisterText' not found");
            return null;
        }
    }






    public void RegisterUser() throws InterruptedException{
        Random random = new Random();
        int N = random.nextInt(10000);
        Thread.sleep(500);
        if( isDisplayed(SignUpTitle)){
            type("william"+N, Name);
            Thread.sleep(500);
            type("Smith", Lastname);
            Thread.sleep(500);
            type("33889474", Dni);
            Thread.sleep(500);
            type("williamsmith"+N+"@tumail.com", Email);
            Thread.sleep(500);
            type("William1234!", Pass);
            Thread.sleep(500);
            type("William1234!", RePass);
            Thread.sleep(500);
            type("5492235678799", Phone);
            Thread.sleep(500);
            click(CreateAccount);
            Thread.sleep(500);
        }else {
            System.out.println("Register page 'RegisterUser' was not found");
        }

    }
    public String registerMessage(){
        return getText(Created);
    }


}
