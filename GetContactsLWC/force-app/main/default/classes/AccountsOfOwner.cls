public with sharing class AccountsOfOwner {
    @AuraEnabled(cacheable=true)
    public static List<Account> getAccounts(){
        //where OwnerId=:UserInfo.getUserId()
        try {
            List<Account> al = [SELECT ID,name from Account where OwnerId=:UserInfo.getUserId() limit 100];
            System.debug(al);
            return al;
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
    @AuraEnabled
    public static List<Contact> getContacts(List<Account> a){
        try {
           // List<Account> a = (List<Account>)o; 
            Set<Id> idlist = new Set<Id>();
            for(Account acc: a) {
                idlist.add(acc.id);
            }
            return [SELECT ID,name from Contact where AccountId IN: idlist];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}