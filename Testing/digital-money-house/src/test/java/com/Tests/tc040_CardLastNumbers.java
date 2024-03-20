package com.Tests;


import com.Pages.CardsPage;
import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class tc040_CardLastNumbers {


    private WebDriver driver;
    CardsPage Page;



    @BeforeAll
    public void SetUp() throws Exception {
        Page = new CardsPage(driver);
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
    @Order(11)
    @Tag("Regression")
    @Tag("smoke")
    public void CardLastNumbers() throws InterruptedException{
        WebDriverWait Wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        assertTrue(Page.landingText().contains("De ahora en adelante, hacés más con tu dinero"));
        Page.login();
        Wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/div/form/div/div[1]/h4")));
        assertTrue(Page.loginText().contains("¡Hola! Ingresá tu e-mail"));
        Page.LoginUser();
        Wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/div/div/ul/li[1]/div/div/span")));
        assertTrue(Page.homeText().contains("Inicio"));
        Page.CardsButton();
        Thread.sleep(1500);
        Wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[2]/div[1]/div[1]/h6")));
        Thread.sleep(2500);
        //assertTrue(Page.EndWith().contains("8908"));





    }


}
