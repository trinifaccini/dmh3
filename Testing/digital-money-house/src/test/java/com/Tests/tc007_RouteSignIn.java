package com.Tests;

import com.Pages.LoginPage;
import org.junit.jupiter.api.*;
import org.openqa.selenium.WebDriver;

import static org.junit.jupiter.api.Assertions.assertTrue;

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class tc007_RouteSignIn {


    private WebDriver driver;
    LoginPage Page;

    @BeforeAll
    public void SetUp() throws Exception {
        Page = new LoginPage(driver);
        driver = Page.openBrowser();
        Page.visit("http://localhost:3000/");
        Thread.sleep(500);

    }


    @AfterAll
    public void TearDown() throws InterruptedException {
       //driver.quit();
    }

    @Test
    @Order(1)
    @Tag("Regression")
    @Tag("smoke")
    public void SignIn() throws InterruptedException{
        assertTrue(Page.landingText().contains("De ahora en adelante, hacés más con tu dinero"));
        Page.login();
        Thread.sleep(10000);
        assertTrue(Page.loginText().contains("¡Hola! Ingresá tu e-mail"));
        Page.LoginUser();
        Thread.sleep(5000);
        //assertTrue(Page.homeText().contains("Inicio"));
        Thread.sleep(5000);

    }


}
