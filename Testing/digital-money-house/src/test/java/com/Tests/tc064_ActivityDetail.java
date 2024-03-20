package com.Tests;


import com.Pages.ActivityPage;
import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

import static org.junit.jupiter.api.Assertions.assertTrue;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class tc064_ActivityDetail {


    private WebDriver driver;
    ActivityPage Page;



    @BeforeAll
    public void SetUp() throws Exception {
        Page = new ActivityPage(driver);
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
    @Order(17)
    @Tag("Regression")
    @Tag("smoke")
    public void ActivityDetailed() throws InterruptedException{
        WebDriverWait Wait = new WebDriverWait(driver, Duration.ofSeconds(10));

        assertTrue(Page.landingText().contains("De ahora en adelante, hacés más con tu dinero"));
        Page.login();
        Wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/div/form/div/div[1]/h4")));
        assertTrue(Page.loginText().contains("¡Hola! Ingresá tu e-mail"));
        Page.LoginUser();
        Wait.until(ExpectedConditions.presenceOfElementLocated(By.xpath("//*[@id=\"__next\"]/div/div[1]/div[1]/div/div/div/ul/li[1]/div/div/span")));
        assertTrue(Page.homeText().contains("Inicio"));
        Page.Activities();
        Thread.sleep(1500);
        assertTrue(Page.ActivityText().contains("Tu actividad"));
        Page.FirstActivity();
        Thread.sleep(1500);
        assertTrue(Page.OperationNumber().contains("Número de operación"));



    }


}
