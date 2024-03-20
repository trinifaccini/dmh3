package com.Tests;

import com.Pages.RegisterPage;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;

import static org.junit.jupiter.api.Assertions.assertTrue;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class tc008_RouteRegister {


    private WebDriver driver;
    RegisterPage Page;

    @BeforeAll
    public void SetUp() throws Exception {
        Page = new RegisterPage(driver);
        driver = Page.openBrowser();
        Page.visit("http://localhost:3000/");
        Thread.sleep(500);
    }


    @AfterAll
    public void TearDown() throws InterruptedException {
        driver.quit();
    }

    @Test
    @Order(2)
    @Tag("Regression")
    @Tag("smoke")
    public void register() throws InterruptedException{
        assertTrue(Page.landingText().contains("De ahora en adelante, hacés más con tu dinero"));
        Page.register();
        Thread.sleep(2000);
        assertTrue(Page.RegisterText().contains("Crear cuenta"));
    }


}
