<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
    <xsl:output method="xml" indent="yes"/>

    <xsl:template match="/">
        <xsl:apply-templates select="div/header"/>
    </xsl:template>

    <xsl:template match="header">
        <xsl:variable name="href" select="@href"/>
        <xsl:variable name="imgSrc">
            <xsl:call-template name="getImage"></xsl:call-template>
        </xsl:variable>
        <main part="main">
            <h1 itemprop="title" part="title"><xsl:value-of select="title"/></h1>
            <h2 itemprop="description" part="description"><xsl:value-of select="meta-ish[@name='description']/@content"/></h2>
            <a itemprop="href" part="link" href="{$href}" target="_blank"><xsl:value-of select="$href"/></a>
            <img src="{$imgSrc}"/>
        </main>
    </xsl:template>

    <xsl:template name="getImage">
        <xsl:choose>
            <xsl:when test="meta-ish[@property='og:image']">
                <xsl:value-of select="meta-ish[@property='og:image']/@content"/>
            </xsl:when>
            <xsl:otherwise>
                <xsl:choose>
                    <xsl:when test="meta-ish[@property='twitter:image']">
                        <xsl:value-of select="meta-ish[@property='twitter:image']/@content"/>
                    </xsl:when>
                    <xsl:otherwise>
                        <xsl:choose>
                            <xsl:when test="//img">
                                <xsl:value-of select="//img[1]/@src"/>
                            </xsl:when>
                            <xsl:otherwise>
                                <xsl:choose>
                                    <xsl:when test="//link[rel='icon']">
                                        <xsl:value-of select="//link[rel='icon'][1]/@href"/>
                                    </xsl:when>
                                </xsl:choose>
                            </xsl:otherwise>
                        </xsl:choose>
                    </xsl:otherwise>               
                </xsl:choose>
                
            </xsl:otherwise>
        </xsl:choose>
    </xsl:template>
    
</xsl:stylesheet>