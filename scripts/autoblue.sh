if [ "$(id -u)" -ne 0 ]; then
    echo "This script must be run as root."
    exit 1
fi

echo "Starting Blue Team defense script..."
echo "Installing auditd and setting up auditing..."

apt update
apt install -y auditd audispd-plugins
systemctl enable auditd
systemctl start auditd


echo "Setting up audit rules for sensitive files..."
auditctl -w /etc/passwd -p wa -k passwd_changes
auditctl -w /etc/shadow -p wa -k shadow_changes
auditctl -w /etc/sudoers -p wa -k sudoers_changes
auditctl -w /usr/bin/sudo -p x -k sudo_usage
auditctl -w /usr/sbin/cron -p x -k cron_usage
auditctl -w /usr/sbin/modprobe -p x -k modprobe_usage

echo "Setting up audit rules for SSH logins..."
auditctl -w /var/log/auth.log -p r -k ssh_logins
auditctl -w /var/log/auth.log -p r -k ssh_failed_logins

echo "Protecting critical system files with chattr..."
chattr +i /etc/passwd
chattr +i /etc/shadow
chattr +i /etc/sudoers
chattr +i /etc/crontab
chattr +i /etc/bash.bashrc
chattr +i /usr/sbin/sudo
chattr +i /usr/bin/sudo
chattr +i /usr/sbin/cron
chattr +i /usr/bin/cron

echo "Restricting write access to /dev/pts..."
chmod 700 /dev/pts

echo "Locking down cronjobs..."
echo "root" > /etc/cron.allow
echo "!" > /etc/cron.deny
chattr +i /etc/cron.allow
chattr +i /etc/cron.deny
chattr +i /var/spool/cron/crontabs/*

echo "Securing sudoers file..."
chmod 0440 /etc/sudoers
chattr +i /etc/sudoers

echo "Locking down kernel module loading..."
echo "install ip_tables /bin/true" >> /etc/modprobe.d/secure_modules.conf
echo "install x_tables /bin/true" >> /etc/modprobe.d/secure_modules.conf
echo "install iptable_filter /bin/true" >> /etc/modprobe.d/secure_modules.conf

echo "Protecting PAM configuration..."
chattr +i /etc/pam.d/*
chattr +i /usr/lib/security/pam_permit.so

echo "Restricting permissions on critical directories..."
chmod 700 /bin
chmod 700 /sbin
chmod 700 /usr/sbin

echo "Performing regular audits of critical binaries..."
find / -type f -perm -4000 -exec ls -l {} \;
echo "Setting up basic process monitoring..."
auditctl -w /proc -p wa -k process_activity

echo "Blue Team defense script completed."



