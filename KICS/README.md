# Checkmarx KICS

- A ferramenta deteta vulnerabilidades em infraestruturas *IaC* e geralmente é utilizada com:
```
docker pull checkmarx/kics:latest
docker run -t -v "{path_to_host_folder_to_scan}":/path checkmarx/kics scan -p /path -o "/path/"
```
- No *blog* https://about.gitlab.com/blog/2022/02/17/fantastic-infrastructure-as-code-security-attacks-and-how-to-find-them/ podemos encontrar um *tutorial* de como utilizar a ferramenta.

- Neste caso utilizamos ficheiros *Terraform* encontrados no repositório público https://gitlab.com/gitlab-de/use-cases/infrastructure-as-code-scanning/-/tree/main/terraform/aws, e corremos o programa na diretoria anetrior a esta:

```
sudo docker run -t -v ./KICS:/path checkmarx/kics:latest scan -p /path -o "/path/"
```

- Os resultados foram gerados no ficheiro `result.json` 
