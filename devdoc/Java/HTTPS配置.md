网站支持https之二：腾讯云上免费获取SSL证书的步骤 - CSDN博客
https://blog.csdn.net/guoxiaojie_415/article/details/80031909



```
server {
    listen 443
    server_name api.chengchijinfu.com
    charset utf-8;
    ssl on; 
    ssl_certificate /home/key_dir/1_api.chengchijinfu.com_bundle.crt;  
    ssl_certificate_key /home/key_dir/2_api.chengchijinfu.com.key; 
}
```

