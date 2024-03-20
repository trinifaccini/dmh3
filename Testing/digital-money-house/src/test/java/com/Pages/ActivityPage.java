package com.Pages;

import org.openqa.selenium.*;

import java.util.concurrent.TimeUnit;


public class ActivityPage extends HomePage {


    public ActivityPage(WebDriver driver) {
        super(driver);
    }

    By ActivityText = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div/div[2]/div/div[1]/h4");
    By OperationNumber = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div[1]/div/div/div[2]/div[3]/p[1]");

    By FilterButton = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div/div[1]/div[2]/button");
    By FirstActivity = By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div/div[2]/div/li[1]/div[2]/span");
    By RadioTodayFilter = By.xpath("//*[@id=\"basic-menu\"]/div[3]/ul/div/div[2]/div/label[1]/span[1]/input");
    By ApplyFilter = By.xpath("//*[@id=\"basic-menu\"]/div[3]/ul/div/button");
    By OperationFilter = By.xpath("//*[@id=\"basic-menu\"]/div[3]/ul/div/div[3]/div[1]/div[1]/p");
    By RadioInputFilter = By.xpath("//*[@id=\"basic-menu\"]/div[3]/ul/div/div[3]/div[2]/div/div/div/div/div/div/label[1]/span[1]/input");




    public String ActivityText() {
        if (isDisplayed(ActivityText)) {
            return getText(ActivityText);
        } else {
            System.out.println("Locator 'ActivityText' not found");
            return null;
        }
    }

    public String OperationNumber() {
        if (isDisplayed(OperationNumber)) {
            return getText(OperationNumber);
        } else {
            System.out.println("Locator 'OperationNumber' not found");
            return null;
        }
    }

    public String FilterButton() {
        if (isDisplayed(FilterButton)) {
            click(FilterButton);
            return null;
        } else {
            System.out.println("Locator 'FilterButton' not found");
            return null;
        }
    }
    public String FirstActivity() {
        if (isDisplayed(FirstActivity)) {
            click(FirstActivity);
            return null;
        } else {
            System.out.println("Locator 'FirstActivity' not found");
            return null;
        }
    }

    public String RadioTodayFilter() {
        if (isDisplayed(RadioTodayFilter)) {
            click(RadioTodayFilter);
            return null;
        } else {
            System.out.println("Locator 'RadioTodayFilter' not found");
            return null;
        }
    }



    public String ApplyFilter() {
        if (isDisplayed(ApplyFilter)) {
            click(ApplyFilter);
            return null;
        }else {
            System.out.println("Locator 'ApplyFilter' not found");
            return null;
        }
    }

    public String OperationFilter() {
        if (isDisplayed(OperationFilter)) {
            //OperationFilter.SendKeys("ds");
            click(OperationFilter);
            return null;
        }else {
            System.out.println("Locator 'OperationFilter' not found");
            return null;
        }
    }
    public String RadioInputFilter() {
        if (isDisplayed(RadioInputFilter)) {
            click(RadioInputFilter);
            return null;
        }else {
            System.out.println("Locator 'RadioInputFilter' not found");
            return null;
        }
    }
}

