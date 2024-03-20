package com.Tests;

import com.Pages.RegisterPage;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;

import static org.junit.jupiter.api.Assertions.assertTrue;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class tc009_SuccessfulRegister {


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
    @Order(3)
    @Tag("Regression")
    @Tag("smoke")
    public void completeRegister() throws InterruptedException{
        assertTrue(Page.landingText().contains("De ahora en adelante, hacés más con tu dinero"));
        Page.register();
        Thread.sleep(1000);
        assertTrue(Page.RegisterText().contains("Crear cuenta"));
        Page.RegisterUser();
        Thread.sleep(5000);
        assertTrue(Page.loginText().contains("¡Hola! Ingresá tu e-mail"));





    }


}
