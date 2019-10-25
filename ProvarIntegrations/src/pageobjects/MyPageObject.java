package pageobjects;

import java.util.List;

import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

import com.provar.core.testapi.annotations.*;

@Page( title="MyPageObject"                                
     , summary=""
     , relativeUrl=""
     , connection="Admin"
     )             
public class MyPageObject {

	@LinkType()
	@FindBy(linkText = "Yes")
	public WebElement yes;
	@LinkType()
	@AuraBy(componentXPath = "//ui:virtualList[@aura:id= 'openActivities']")
	public WebElement _;
	@LinkType()
	@AuraBy(componentXPath = "//ui:virtualList[@aura:id= 'openActivities']")
	public WebElement call;
	@BooleanType()
	@FindBy(xpath = "//label[normalize-space(.)='Select item 1']/span[contains(@class,'slds-checkbox--faux')]")
	public WebElement _0001000;
			
}
