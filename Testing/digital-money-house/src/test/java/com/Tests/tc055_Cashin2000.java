package com.Tests;


import com.Pages.CardInPage;
import com.Pages.CashInPage;
import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class tc055_Cashin2000 {


    private WebDriver driver;
    CardInPage Page;



    @BeforeAll
    public void SetUp() throws Exception {
        Page = new CardInPage(driver);
        driver = Page.openBrowser();
        Page.visit("http://localhost:3000/");
        Thread.sleep(500);
    }


    @AfterAll
    public void TearDown() throws InterruptedException {
        Page.LogOut();
        driver.quit();
    }

    @Test
    @Order(13)
    @Tag("Regression")
    @Tag("smoke")
    public void CashInAmount() throws InterruptedException{
        WebDriverWait Wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        assertTrue(Page.landingText().contains("De ahora en adelante, hacés más con tu dinero"));
        Page.login();
        Wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/div/form/div/div[1]/h4")));
        assertTrue(Page.loginText().contains("¡Hola! Ingresá tu e-mail"));
        Page.LoginUser();
        Wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/div/div/ul/li[1]/div/div/span")));
        assertTrue(Page.homeText().contains("Inicio"));
        Page.CashIn();
        Thread.sleep(500);
        Page.CardTransfer();
        Wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div")));
        Wait.until(ExpectedConditions.presenceOfElementLocated(By.id("radio-test")));
        System.out.println("finded");
        Thread.sleep(1500);
        Page.RadioCard();
        Thread.sleep(500);
        Page.ContinueCashIn();
        Wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div/div[1]/div/input")));
        Page.CashInAmountCard();
        Thread.sleep(2500);
        Page.ContinueCashIn();
        Thread.sleep(2500);
        Wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div/h4")));
        assertTrue(Page.CashInRevision().contains("Revisá que está todo bien"));






    }


}
