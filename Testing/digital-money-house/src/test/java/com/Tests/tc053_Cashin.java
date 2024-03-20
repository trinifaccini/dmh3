package com.Tests;


import com.Pages.CardInPage;
import com.Pages.CardsPage;
import com.Pages.CashInPage;
import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import javax.lang.model.util.ElementScanner8;
import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class tc053_Cashin {


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
    @Order(12)
    @Tag("Regression")
    @Tag("smoke")
    public void CashIn() throws InterruptedException{
        WebDriverWait Wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        assertTrue(Page.landingText().contains("De ahora en adelante, hacés más con tu dinero"));
        Page.login();
        Wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/div/form/div/div[1]/h4")));
        assertTrue(Page.loginText().contains("¡Hola! Ingresá tu e-mail"));
        Page.LoginUser();
        Wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/div/div/ul/li[1]/div/div/span")));
        assertTrue(Page.homeText().contains("Inicio"));
        Page.CashIn();
        Thread.sleep(1500);
        Page.CardTransfer();
        Wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div")));
        Wait.until(ExpectedConditions.presenceOfElementLocated(By.id("radio-test")));
        System.out.println("finded");
        Thread.sleep(1500);
        Page.RadioCard();
        Thread.sleep(500);
        Page.ContinueCashIn();
        Thread.sleep(1500);
        Wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div/div[1]/div/input")));






    }


}
