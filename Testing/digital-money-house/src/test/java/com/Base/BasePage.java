package com.Base;

import org.openqa.selenium.By;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.support.ui.Select;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.List;

public class BasePage {
    protected WebDriver driver;
    public BasePage(WebDriver driver){
        this.driver = driver;
    }

    public WebDriver openBrowser() throws InterruptedException {

        System.setProperty("webdriver.chrome.driver", "./src/test/resources/chomedriver/chromedriver.exe");
        driver = new ChromeDriver();
        return driver;

    }

    public WebElement findElement(By locator){return driver.findElement(locator);}
    public List<WebElement> findElements(By locator){
        return driver.findElements(locator);
    }

    public String getText(WebElement element){
        return element.getText();
    }
    public String getText(By locator){
        return driver.findElement(locator).getText();
    }
    public void type(String inputText, By locator){
        driver.findElement(locator).sendKeys(inputText);
    }
    public void click(By locator){
        driver.findElement(locator).click();
    }

    public void Selector(String testText, By locator){
        Select sel = new Select(findElement(locator));
        sel.selectByVisibleText(testText);
    }
    public void SelectorByIndex(int index, By locator){
        Select sel = new Select(findElement(locator));
        sel.selectByIndex(index);
    }

    public Boolean isDisplayed(By locator){
        try{
            return driver.findElement(locator).isDisplayed();
        }catch (org.openqa.selenium.NoSuchElementException e){
            return false ;
        }
    }

    public void visit (String url){
        driver.get(url);

    }

    public void ScrollDown (By locator){ driver.findElement(locator).sendKeys(Keys.DOWN);}



}
